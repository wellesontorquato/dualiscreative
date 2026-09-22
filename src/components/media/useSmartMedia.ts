"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  detectFaceFocus,
  type FaceFocusPoint,
} from "@/lib/face-focus";


type SmartMediaKind =
  | "image"
  | "video";


type UseSmartMediaOptions = {
  kind: SmartMediaKind;

  fallbackFocus: FaceFocusPoint;

  imageStrength?: number;

  videoStrength?: number;

  trackingInterval?: number;
};


type DetectableMedia =
  | HTMLImageElement
  | HTMLVideoElement;


/*
 * Uma fila única impede que várias mídias
 * executem o detector simultaneamente.
 */

let faceDetectionQueue:
  Promise<void> =
    Promise.resolve();


/*
 * Estado técnico que não participa do render.
 *
 * WeakMap / WeakSet permitem associar dados
 * diretamente aos elementos sem React refs.
 */

const pendingDetections =
  new WeakSet<DetectableMedia>();


const trackingTimers =
  new WeakMap<
    HTMLVideoElement,
    number
  >();


let visibilityListenerInstalled =
  false;


/*
 * ================================================
 * VIDEO HELPERS
 * ================================================
 */

function clearTracking(
  video:
    HTMLVideoElement,
) {

  const timer =
    trackingTimers.get(
      video,
    );


  if (
    timer !== undefined
  ) {

    window.clearInterval(
      timer,
    );


    trackingTimers.delete(
      video,
    );

  }

}


function resolveVideo(
  element:
    HTMLElement,
) {

  if (
    element instanceof
      HTMLVideoElement
  ) {

    return element;

  }


  return (
    element.querySelector<HTMLVideoElement>(
      'video[data-smart-video="true"]',
    ) ??
    element.querySelector<HTMLVideoElement>(
      "video",
    )
  );

}


/*
 * Quando a aba perde visibilidade,
 * pausamos todos os vídeos SmartMedia.
 *
 * Este listener é instalado uma única vez.
 */

function ensureVisibilityPause() {

  if (
    visibilityListenerInstalled ||
    typeof document ===
      "undefined"
  ) {

    return;

  }


  visibilityListenerInstalled =
    true;


  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        !document.hidden
      ) {

        return;

      }


      document
        .querySelectorAll<HTMLVideoElement>(
          'video[data-smart-video="true"]',
        )
        .forEach(
          (video) => {

            video.pause();

            clearTracking(
              video,
            );

          },
        );

    },
  );

}


/*
 * ================================================
 * SHARED MEDIA ENGINE
 * ================================================
 */

export function useSmartMedia({
  kind,
  fallbackFocus,
  imageStrength = 0.76,
  videoStrength = 0.18,
  trackingInterval = 1800,
}: UseSmartMediaOptions) {

  const [
    focus,
    setFocus,
  ] =
    useState<FaceFocusPoint>(
      () => ({
        x:
          fallbackFocus.x,

        y:
          fallbackFocus.y,
      }),
    );


  const [
    isPlaying,
    setIsPlaying,
  ] =
    useState(false);


  const [
    mediaFailed,
    setMediaFailed,
  ] =
    useState(false);


  const [
    faceDetected,
    setFaceDetected,
  ] =
    useState(false);


  /*
   * ==============================================
   * FACE DETECTION
   * ==============================================
   */

  const updateFaceFocus =
    useCallback(
      (
        media:
          DetectableMedia,
      ) => {

        if (
          pendingDetections.has(
            media,
          )
        ) {

          return;

        }


        pendingDetections.add(
          media,
        );


        faceDetectionQueue =
          faceDetectionQueue
            .then(
              async () => {

                try {

                  const detected =
                    await detectFaceFocus(
                      media,
                      kind,
                    );


                  if (
                    !detected
                  ) {

                    return;

                  }


                  /*
                   * DUALIS_MOBILE_FACE_PRIORITY_V2
                   *
                   * Desktop:
                   * preserva exatamente os valores existentes.
                   *
                   * Mobile:
                   * dá mais autoridade ao rosto.
                   *
                   * Hero:
                   * recebe prioridade ainda maior.
                   */

                  const isMobile =
                    typeof window !== "undefined" &&
                    window.matchMedia(
                      "(max-width: 800px)",
                    ).matches;


                  const isProjectHero =
                    isMobile &&
                    Boolean(
                      media.closest(
                        '[data-project-hero="true"]',
                      ),
                    );


                  const strength =
                    kind === "image"
                      ? isMobile
                        ? isProjectHero
                          ? 1
                          : Math.max(
                              imageStrength,
                              0.92,
                            )
                        : imageStrength
                      : isMobile
                        ? isProjectHero
                          ? 0.64
                          : Math.max(
                              videoStrength,
                              0.46,
                            )
                        : videoStrength;


                  setFocus(
                    (previous) => ({
                      x:
                        previous.x +
                        (
                          detected.x -
                          previous.x
                        ) *
                          strength,

                      y:
                        previous.y +
                        (
                          detected.y -
                          previous.y
                        ) *
                          strength,
                    }),
                  );


                  setFaceDetected(
                    true,
                  );

                }
                finally {

                  pendingDetections.delete(
                    media,
                  );

                }

              },
            )
            .catch(
              () => {

                pendingDetections.delete(
                  media,
                );

              },
            );

      },
      [
        imageStrength,
        kind,
        videoStrength,
      ],
    );


  /*
   * ==============================================
   * VIDEO TRACKING
   * ==============================================
   */

  const startTracking =
    useCallback(
      (
        video:
          HTMLVideoElement,
      ) => {

        clearTracking(
          video,
        );


        const timer =
          window.setInterval(
            () => {

              if (
                video.paused ||
                video.readyState <
                  2
              ) {

                return;

              }


              updateFaceFocus(
                video,
              );

            },
            trackingInterval,
          );


        trackingTimers.set(
          video,
          timer,
        );

      },
      [
        trackingInterval,
        updateFaceFocus,
      ],
    );


  /*
   * ==============================================
   * HOVER -> PLAY
   * ==============================================
   */

  const onMouseEnter =
    useCallback(
      async (
        container:
          HTMLElement,
      ) => {

        if (
          kind !== "video" ||
          mediaFailed
        ) {

          return;

        }


        const canHover =
          window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          ).matches;


        if (
          !canHover
        ) {

          return;

        }


        const video =
          resolveVideo(
            container,
          );


        if (
          !video
        ) {

          return;

        }


        try {

          await video.play();


          updateFaceFocus(
            video,
          );

        }
        catch {

          video.pause();

          clearTracking(
            video,
          );

        }

      },
      [
        kind,
        mediaFailed,
        updateFaceFocus,
      ],
    );


  /*
   * ==============================================
   * MOUSE SAI -> PAUSE
   * ==============================================
   */

  const onMouseLeave =
    useCallback(
      (
        container:
          HTMLElement,
      ) => {

        if (
          kind !== "video"
        ) {

          return;

        }


        const video =
          resolveVideo(
            container,
          );


        if (
          !video
        ) {

          return;

        }


        video.pause();


        clearTracking(
          video,
        );

      },
      [
        kind,
      ],
    );


  /*
   * ==============================================
   * ACCESSIBLE VIDEO TOGGLE
   *
   * Usado por teclado e tecnologias assistivas.
   *
   * O comportamento comum de touch permanece
   * estático, conforme definido para o projeto.
   * ==============================================
   */

  const toggleVideo =
    useCallback(
      async (
        container:
          HTMLElement,
      ) => {

        if (
          kind !== "video" ||
          mediaFailed
        ) {

          return;

        }


        const video =
          resolveVideo(
            container,
          );


        if (!video) {
          return;
        }


        if (
          !video.paused
        ) {

          video.pause();

          clearTracking(
            video,
          );

          return;
        }


        try {

          await video.play();


          updateFaceFocus(
            video,
          );

        }
        catch {

          video.pause();

          clearTracking(
            video,
          );

        }

      },
      [
        kind,
        mediaFailed,
        updateFaceFocus,
      ],
    );


  /*
   * ==============================================
   * IMAGE
   * ==============================================
   */

  const onImageLoad =
    useCallback(
      (
        image:
          HTMLImageElement,
      ) => {

        if (
          image.naturalWidth <=
            0 ||
          image.naturalHeight <=
            0
        ) {

          return;

        }


        updateFaceFocus(
          image,
        );

      },
      [
        updateFaceFocus,
      ],
    );


  /*
   * ==============================================
   * VIDEO METADATA
   * ==============================================
   */

  const onVideoLoadedMetadata =
    useCallback(
      (
        video:
          HTMLVideoElement,
      ) => {

        ensureVisibilityPause();


        video.pause();


        if (
          video.currentTime <
            0.001 &&
          Number.isFinite(
            video.duration,
          ) &&
          video.duration >
            0.08
        ) {

          try {

            video.currentTime =
              Math.min(
                0.04,
                video.duration /
                  10,
              );

          }
          catch {
            // Mantemos o primeiro frame disponível.
          }

        }

      },
      [],
    );


  const onVideoLoadedData =
    useCallback(
      (
        video:
          HTMLVideoElement,
      ) => {

        video.pause();


        if (
          video.readyState >=
            2
        ) {

          updateFaceFocus(
            video,
          );

        }

      },
      [
        updateFaceFocus,
      ],
    );


  const onVideoSeeked =
    useCallback(
      (
        video:
          HTMLVideoElement,
      ) => {

        if (
          video.paused &&
          video.readyState >=
            2
        ) {

          updateFaceFocus(
            video,
          );

        }

      },
      [
        updateFaceFocus,
      ],
    );


  const onVideoPlay =
    useCallback(
      (
        video:
          HTMLVideoElement,
      ) => {

        setIsPlaying(
          true,
        );


        startTracking(
          video,
        );

      },
      [
        startTracking,
      ],
    );


  const onVideoPause =
    useCallback(
      (
        video:
          HTMLVideoElement,
      ) => {

        setIsPlaying(
          false,
        );


        clearTracking(
          video,
        );

      },
      [],
    );


  const onMediaError =
    useCallback(
      () => {

        setMediaFailed(
          true,
        );

        setIsPlaying(
          false,
        );

      },
      [],
    );


  return {
    focus,

    isPlaying,
    mediaFailed,
    faceDetected,

    onMouseEnter,
    onMouseLeave,

    toggleVideo,

    onImageLoad,

    onVideoLoadedMetadata,
    onVideoLoadedData,
    onVideoSeeked,
    onVideoPlay,
    onVideoPause,

    onMediaError,
  };
}
