"use client";

import {
  useEffect,
  type ReactNode,
} from "react";

import Lenis from "lenis";

import gsap from "gsap";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";


type SmoothScrollProps = {
  children: ReactNode;
};


export function SmoothScroll({
  children,
}: SmoothScrollProps) {

  useEffect(
    () => {

      gsap.registerPlugin(
        ScrollTrigger,
      );


      const reducedMotionQuery =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );


      let lenis:
        Lenis | null =
          null;


      /*
       * O ticker do GSAP trabalha em segundos.
       * Lenis espera milissegundos.
       */

      const updateLenis =
        (
          time:
            number,
        ) => {

          lenis?.raf(
            time * 1000,
          );

        };


      const destroyLenis =
        () => {

          gsap.ticker.remove(
            updateLenis,
          );


          if (
            lenis
          ) {

            lenis.destroy();

            lenis =
              null;

          }

        };


      const createLenis =
        () => {

          /*
           * Acessibilidade:
           *
           * se o sistema pedir movimento reduzido,
           * usamos scroll nativo.
           */

          if (
            reducedMotionQuery.matches
          ) {

            document.documentElement
              .setAttribute(
                "data-reduced-motion",
                "true",
              );


            ScrollTrigger.refresh();

            return;

          }


          document.documentElement
            .removeAttribute(
              "data-reduced-motion",
            );


          lenis =
            new Lenis({
              autoRaf:
                false,

              lerp:
                0.085,

              smoothWheel:
                true,

              wheelMultiplier:
                0.9,

              touchMultiplier:
                1,
            });


          /*
           * Toda mudança do Lenis informa
           * imediatamente o ScrollTrigger.
           */

          lenis.on(
            "scroll",
            ScrollTrigger.update,
          );


          /*
           * Um único relógio para:
           *
           * Lenis
           * GSAP
           * ScrollTrigger
           */

          gsap.ticker.add(
            updateLenis,
          );


          /*
           * Recomendação da integração oficial
           * Lenis + GSAP.
           */

          gsap.ticker.lagSmoothing(
            0,
          );


          ScrollTrigger.refresh();

        };


      const rebuildScrollEngine =
        () => {

          destroyLenis();

          createLenis();

        };


      createLenis();


      reducedMotionQuery
        .addEventListener(
          "change",
          rebuildScrollEngine,
        );


      return () => {

        reducedMotionQuery
          .removeEventListener(
            "change",
            rebuildScrollEngine,
          );


        destroyLenis();


        document.documentElement
          .removeAttribute(
            "data-reduced-motion",
          );

      };

    },
    [],
  );


  return (
    <>
      {children}
    </>
  );
}
