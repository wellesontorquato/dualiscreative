import type {
  FaceDetector as MediaPipeFaceDetector,
} from "@mediapipe/tasks-vision";

export type FaceFocusPoint = {
  x: number;
  y: number;
};

type RunningMode =
  | "IMAGE"
  | "VIDEO";

type MediaElement =
  | HTMLImageElement
  | HTMLVideoElement;

/*
 * FACE_TRACKING_RUNTIME_FLAG_V1
 *
 * O foco editorial salvo nos dados e a fonte
 * primaria de enquadramento.
 *
 * MediaPipe funciona como refinamento opcional.
 */
const faceTrackingEnabled =
  process.env
    .NEXT_PUBLIC_ENABLE_FACE_TRACKING ===
  "true";

let imageDetectorPromise:
  Promise<MediaPipeFaceDetector> | null =
    null;

let videoDetectorPromise:
  Promise<MediaPipeFaceDetector> | null =
    null;


function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    max,
    Math.max(
      min,
      value,
    ),
  );
}



/*
 * DUALIS_MEDIAPIPE_BENIGN_LOG_FILTER_V1
 *
 * O runtime WASM do MediaPipe/TensorFlow Lite envia
 * determinadas mensagens INFO pelo canal stderr.
 *
 * O Next.js dev overlay interpreta isso como
 * console.error, mesmo não sendo uma falha.
 *
 * Filtramos SOMENTE mensagens conhecidamente
 * informativas. Qualquer outro console.error
 * continua sendo encaminhado normalmente.
 */

type DualisMediaPipeGlobal =
  typeof globalThis & {
    __dualisMediaPipeLogFilterInstalled?:
      boolean;
  };


function installMediaPipeBenignLogFilter() {

  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }


  const state =
    globalThis as
      DualisMediaPipeGlobal;


  /*
   * Proteção contra React Fast Refresh /
   * Hot Module Replacement.
   */

  if (
    state
      .__dualisMediaPipeLogFilterInstalled
  ) {
    return;
  }


  const originalConsoleError =
    console.error.bind(
      console,
    );


  console.error =
    (
      ...args:
        unknown[]
    ) => {

      const message =
        args
          .map(
            (
              value,
            ) => {

              if (
                typeof value ===
                "string"
              ) {
                return value;
              }


              if (
                value instanceof
                Error
              ) {
                return value.message;
              }


              return "";
            },
          )
          .join(" ");


      /*
       * TensorFlow Lite:
       * delegate CPU criado corretamente.
       *
       * Isso é INFO, não erro.
       */

      if (
        message.includes(
          "Created TensorFlow Lite XNNPACK delegate for CPU.",
        )
      ) {
        return;
      }


      /*
       * Outro INFO normal que algumas
       * builds do XNNPACK imprimem.
       */

      if (
        message.includes(
          "XNNPack weight cache not enabled.",
        )
      ) {
        return;
      }


      /*
       * QUALQUER outro erro continua
       * aparecendo normalmente.
       */

      originalConsoleError(
        ...args,
      );
    };


  state
    .__dualisMediaPipeLogFilterInstalled =
      true;
}
async function createDetector(
  runningMode: RunningMode,
) {
  installMediaPipeBenignLogFilter();

  const {
    FaceDetector,
    FilesetResolver,
  } =
    await import(
      "@mediapipe/tasks-vision"
    );

  const vision =
    await FilesetResolver.forVisionTasks(
      "/mediapipe/wasm",
    );

  return FaceDetector.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath:
          "/mediapipe/models/blaze_face_full_range.tflite",
      },

      runningMode,

      minDetectionConfidence:
        0.50,

      minSuppressionThreshold:
        0.3,
    },
  );
}


function getImageDetector() {
  if (!imageDetectorPromise) {
    imageDetectorPromise =
      createDetector("IMAGE");
  }

  return imageDetectorPromise;
}


function getVideoDetector() {
  if (!videoDetectorPromise) {
    videoDetectorPromise =
      createDetector("VIDEO");
  }

  return videoDetectorPromise;
}


function getMediaSize(
  media: MediaElement,
) {
  if (
    media instanceof
    HTMLImageElement
  ) {
    return {
      width:
        media.naturalWidth,

      height:
        media.naturalHeight,
    };
  }

  return {
    width:
      media.videoWidth,

    height:
      media.videoHeight,
  };
}


export async function detectFaceFocus(
  media: MediaElement,
  kind:
    | "image"
    | "video",
): Promise<
  FaceFocusPoint | null
> {

  if (
    !faceTrackingEnabled
  ) {
    return null;
  }
  try {
    const {
      width,
      height,
    } =
      getMediaSize(media);

    if (
      width <= 0 ||
      height <= 0
    ) {
      return null;
    }

    const detector =
      kind === "image"
        ? await getImageDetector()
        : await getVideoDetector();

    const result =
      kind === "image"
        ? detector.detect(
            media,
          )
        : detector.detectForVideo(
            media,
            performance.now(),
          );

    if (
      !result.detections.length
    ) {
      return null;
    }


    /*
     * Consideramos ate os 3 rostos
     * mais relevantes.
     *
     * Isso funciona melhor para
     * editoriais com mais de uma pessoa.
     */

    const detections =
      [...result.detections]
        .sort(
          (
            first,
            second,
          ) => {
            const firstBox =
              first.boundingBox;

            const secondBox =
              second.boundingBox;

            const firstArea =
              firstBox
                ? firstBox.width *
                  firstBox.height
                : 0;

            const secondArea =
              secondBox
                ? secondBox.width *
                  secondBox.height
                : 0;

            return (
              secondArea -
              firstArea
            );
          },
        )
        .slice(0, 3);


    const boxes: Array<{
      originX: number;
      originY: number;
      width: number;
      height: number;
    }> = [];


    for (
      const detection
      of detections
    ) {
      const box =
        detection.boundingBox;

      if (box) {
        boxes.push(box);
      }
    }


    if (!boxes.length) {
      return null;
    }


    /*
     * Criamos uma caixa que engloba
     * todos os rostos principais.
     */

    const left =
      Math.min(
        ...boxes.map(
          (box) =>
            box.originX,
        ),
      );

    const top =
      Math.min(
        ...boxes.map(
          (box) =>
            box.originY,
        ),
      );

    const right =
      Math.max(
        ...boxes.map(
          (box) =>
            box.originX +
            box.width,
        ),
      );

    const bottom =
      Math.max(
        ...boxes.map(
          (box) =>
            box.originY +
            box.height,
        ),
      );


    /*
     * X:
     * centro do grupo de rostos.
     *
     * Y:
     * usamos uma regiao um pouco
     * acima do centro geometrico
     * para dar headroom editorial.
     */

    const faceCenterX =
      (
        left +
        right
      ) / 2;

    const faceFocusY =
      top +
      (
        bottom -
        top
      ) * 0.40;


    const x =
      clamp(
        (
          faceCenterX /
          width
        ) * 100,
        16,
        84,
      );

    const y =
      clamp(
        (
          faceFocusY /
          height
        ) * 100,
        14,
        68,
      );


    return {
      x,
      y,
    };
  }
  catch {
    /*
     * Caso o navegador, CORS ou GPU
     * impeça a inferencia, o componente
     * mantém o ponto focal manual.
     */

    return null;
  }
}
