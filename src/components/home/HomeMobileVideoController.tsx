"use client";

import {
  useEffect,
} from "react";


const MOBILE_QUERY =
  "(max-width: 800px)";


const REDUCED_MOTION_QUERY =
  "(prefers-reduced-motion: reduce)";


const VIDEO_SELECTOR =
  '.home-work-card--video video[data-smart-video="true"]';


export function HomeMobileVideoController() {

  useEffect(
    () => {

      const mobileQuery =
        window.matchMedia(
          MOBILE_QUERY,
        );


      const reducedMotionQuery =
        window.matchMedia(
          REDUCED_MOTION_QUERY,
        );


      let observer:
        IntersectionObserver | null =
          null;


      let activeVideo:
        HTMLVideoElement | null =
          null;


      let syncFrame =
        0;


      let disposed =
        false;


      const ratios =
        new Map<
          HTMLVideoElement,
          number
        >();


      const getVideos =
        () =>
          Array.from(
            document.querySelectorAll<HTMLVideoElement>(
              VIDEO_SELECTOR,
            ),
          ).filter(
            (
              video,
            ) =>
              video.isConnected,
          );


      const prepareVideo =
        (
          video:
            HTMLVideoElement,
        ) => {

          video.muted =
            true;

          video.defaultMuted =
            true;

          video.loop =
            true;

          video.playsInline =
            true;


          video.setAttribute(
            "muted",
            "",
          );


          video.setAttribute(
            "playsinline",
            "",
          );

        };


      const pauseVideo =
        (
          video:
            HTMLVideoElement,
        ) => {

          if (
            !video.paused
          ) {

            video.pause();

          }


          if (
            activeVideo ===
              video
          ) {

            activeVideo =
              null;

          }

        };


      const pauseAll =
        () => {

          getVideos()
            .forEach(
              pauseVideo,
            );


          activeVideo =
            null;

        };


      const syncPlayback =
        () => {

          syncFrame =
            0;


          if (
            disposed
          ) {

            return;

          }


          if (
            !mobileQuery.matches ||
            reducedMotionQuery.matches ||
            document.hidden
          ) {

            pauseAll();

            return;

          }


          const videos =
            getVideos();


          let bestVideo:
            HTMLVideoElement | null =
              null;


          let bestRatio =
            0;


          for (
            const video
            of videos
          ) {

            const ratio =
              ratios.get(
                video,
              ) ?? 0;


            if (
              ratio >
              bestRatio
            ) {

              bestRatio =
                ratio;

              bestVideo =
                video;

            }

          }


          /*
           * Histerese:
           *
           * entra em play com aproximadamente
           * 56% do card visivel.
           *
           * O video que ja estava tocando
           * so pausa quando cai bastante.
           *
           * Isso evita piscar play/pause
           * durante pequenos movimentos do scroll.
           */

          if (
            !bestVideo ||
            bestRatio <
              0.56
          ) {

            if (
              activeVideo
            ) {

              const activeRatio =
                ratios.get(
                  activeVideo,
                ) ?? 0;


              if (
                activeRatio <
                0.38
              ) {

                pauseVideo(
                  activeVideo,
                );

              }

            }


            return;

          }


          for (
            const video
            of videos
          ) {

            if (
              video !==
              bestVideo
            ) {

              pauseVideo(
                video,
              );

            }

          }


          if (
            activeVideo ===
              bestVideo &&
            !bestVideo.paused
          ) {

            return;

          }


          prepareVideo(
            bestVideo,
          );


          activeVideo =
            bestVideo;


          void bestVideo
            .play()
            .catch(
              () => {

                if (
                  activeVideo ===
                    bestVideo
                ) {

                  activeVideo =
                    null;

                }

              },
            );

        };


      const requestSync =
        () => {

          if (
            syncFrame
          ) {

            window.cancelAnimationFrame(
              syncFrame,
            );

          }


          syncFrame =
            window.requestAnimationFrame(
              syncPlayback,
            );

        };


      const destroyObserver =
        () => {

          observer
            ?.disconnect();


          observer =
            null;


          ratios.clear();

        };


      const setupObserver =
        () => {

          destroyObserver();

          pauseAll();


          if (
            disposed ||
            !mobileQuery.matches ||
            reducedMotionQuery.matches
          ) {

            return;

          }


          const videos =
            getVideos();


          if (
            videos.length ===
              0
          ) {

            return;

          }


          videos.forEach(
            (
              video,
            ) => {

              prepareVideo(
                video,
              );


              ratios.set(
                video,
                0,
              );

            },
          );


          observer =
            new IntersectionObserver(
              (
                entries,
              ) => {

                for (
                  const entry
                  of entries
                ) {

                  if (
                    !(
                      entry.target instanceof
                        HTMLVideoElement
                    )
                  ) {

                    continue;

                  }


                  ratios.set(
                    entry.target,
                    entry.isIntersecting
                      ? entry.intersectionRatio
                      : 0,
                  );

                }


                requestSync();

              },
              {
                root:
                  null,

                rootMargin:
                  "-7% 0px -7% 0px",

                threshold: [
                  0,
                  0.2,
                  0.38,
                  0.56,
                  0.7,
                  0.85,
                  1,
                ],
              },
            );


          videos.forEach(
            (
              video,
            ) => {

              observer
                ?.observe(
                  video,
                );

            },
          );


          requestSync();

        };


      const handleVisibility =
        () => {

          if (
            document.hidden
          ) {

            pauseAll();

            return;

          }


          requestSync();

        };


      const handlePageHide =
        () => {

          pauseAll();

        };


      const handleResize =
        () => {

          requestSync();

        };


      mobileQuery.addEventListener(
        "change",
        setupObserver,
      );


      reducedMotionQuery.addEventListener(
        "change",
        setupObserver,
      );


      document.addEventListener(
        "visibilitychange",
        handleVisibility,
      );


      window.addEventListener(
        "pagehide",
        handlePageHide,
      );


      window.addEventListener(
        "orientationchange",
        handleResize,
      );


      /*
       * O effect roda depois do commit,
       * então normalmente os vídeos já existem.
       *
       * O segundo setup cobre hidratação
       * ou carregamento um pouco mais tardio.
       */

      setupObserver();


      const delayedSetup =
        window.setTimeout(
          setupObserver,
          350,
        );


      return () => {

        disposed =
          true;


        window.clearTimeout(
          delayedSetup,
        );


        if (
          syncFrame
        ) {

          window.cancelAnimationFrame(
            syncFrame,
          );

        }


        destroyObserver();

        pauseAll();


        mobileQuery.removeEventListener(
          "change",
          setupObserver,
        );


        reducedMotionQuery.removeEventListener(
          "change",
          setupObserver,
        );


        document.removeEventListener(
          "visibilitychange",
          handleVisibility,
        );


        window.removeEventListener(
          "pagehide",
          handlePageHide,
        );


        window.removeEventListener(
          "orientationchange",
          handleResize,
        );

      };

    },
    [],
  );


  return null;
}
