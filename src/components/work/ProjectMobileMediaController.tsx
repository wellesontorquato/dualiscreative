"use client";

import {
  useEffect,
} from "react";


const MOBILE_QUERY =
  "(max-width: 800px)";


const REDUCED_MOTION_QUERY =
  "(prefers-reduced-motion: reduce)";


export function ProjectMobileMediaController() {

  useEffect(
    () => {

      const mobile =
        window.matchMedia(
          MOBILE_QUERY,
        );


      const reducedMotion =
        window.matchMedia(
          REDUCED_MOTION_QUERY,
        );


      let observer:
        IntersectionObserver | null =
          null;


      let videos:
        HTMLVideoElement[] =
          [];


      const clickHandlers =
        new Map<
          HTMLVideoElement,
          () => void
        >();


      const getFrame =
        (
          video:
            HTMLVideoElement,
        ) =>
          video.closest<HTMLElement>(
            ".project-media-frame",
          );


      const setActive =
        (
          video:
            HTMLVideoElement,
          active:
            boolean,
        ) => {

          const frame =
            getFrame(
              video,
            );


          if (!frame) {
            return;
          }


          if (active) {

            frame.setAttribute(
              "data-mobile-video-active",
              "true",
            );

          }
          else {

            frame.removeAttribute(
              "data-mobile-video-active",
            );

          }

        };


      const pause =
        (
          video:
            HTMLVideoElement,
        ) => {

          video.pause();

          setActive(
            video,
            false,
          );

        };


      const pauseOthers =
        (
          current:
            HTMLVideoElement,
        ) => {

          videos.forEach(
            (
              video,
            ) => {

              if (
                video !== current
              ) {

                pause(
                  video,
                );

              }

            },
          );

        };


      const play =
        async (
          video:
            HTMLVideoElement,
        ) => {

          if (
            reducedMotion.matches
          ) {

            pause(
              video,
            );

            return;
          }


          pauseOthers(
            video,
          );


          video.muted =
            true;

          video.playsInline =
            true;


          try {

            await video.play();

            setActive(
              video,
              true,
            );

          }
          catch {

            /*
             * iOS/browser pode bloquear
             * uma primeira tentativa.
             *
             * O toque manual continua disponível.
             */

            pause(
              video,
            );

          }

        };


      const destroy =
        () => {

          observer?.disconnect();

          observer =
            null;


          videos.forEach(
            (
              video,
            ) => {

              pause(
                video,
              );


              const handler =
                clickHandlers.get(
                  video,
                );


              if (handler) {

                video.removeEventListener(
                  "click",
                  handler,
                );

              }

            },
          );


          clickHandlers.clear();

          videos =
            [];

        };


      const setup =
        () => {

          destroy();


          /*
           * Desktop fica completamente fora
           * desta experiência.
           */

          if (
            !mobile.matches
          ) {

            return;
          }


          videos =
            Array.from(
              document.querySelectorAll<HTMLVideoElement>(
                '.project-media-frame video[data-smart-video="true"]',
              ),
            );


          videos.forEach(
            (
              video,
            ) => {

              video.muted =
                true;

              video.playsInline =
                true;

              video.pause();


              const onClick =
                () => {

                  if (
                    reducedMotion.matches
                  ) {
                    return;
                  }


                  if (
                    video.paused
                  ) {

                    void play(
                      video,
                    );

                  }
                  else {

                    pause(
                      video,
                    );

                  }

                };


              clickHandlers.set(
                video,
                onClick,
              );


              video.addEventListener(
                "click",
                onClick,
              );

            },
          );


          if (
            reducedMotion.matches ||
            videos.length === 0
          ) {

            return;
          }


          observer =
            new IntersectionObserver(
              (
                entries,
              ) => {

                entries.forEach(
                  (
                    entry,
                  ) => {

                    const video =
                      entry.target as
                        HTMLVideoElement;


                    /*
                     * Entrou de verdade na área central:
                     * toca.
                     */

                    if (
                      entry.isIntersecting &&
                      entry.intersectionRatio >=
                        0.55
                    ) {

                      void play(
                        video,
                      );

                      return;
                    }


                    /*
                     * Está praticamente saindo:
                     * pausa no frame atual.
                     */

                    if (
                      !entry.isIntersecting ||
                      entry.intersectionRatio <=
                        0.16
                    ) {

                      pause(
                        video,
                      );

                    }

                  },
                );

              },
              {
                threshold: [
                  0,
                  0.16,
                  0.35,
                  0.55,
                  0.72,
                ],

                rootMargin:
                  "-4% 0px -10% 0px",
              },
            );


          videos.forEach(
            (
              video,
            ) => {

              observer?.observe(
                video,
              );

            },
          );

        };


      setup();


      mobile.addEventListener(
        "change",
        setup,
      );


      reducedMotion.addEventListener(
        "change",
        setup,
      );


      return () => {

        mobile.removeEventListener(
          "change",
          setup,
        );


        reducedMotion.removeEventListener(
          "change",
          setup,
        );


        destroy();

      };

    },
    [],
  );


  return null;
}
