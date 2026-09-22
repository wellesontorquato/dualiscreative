"use client";

import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";


export function ScrollProgress() {

  const barRef =
    useRef<HTMLDivElement>(
      null,
    );


  useEffect(
    () => {

      const bar =
        barRef.current;


      if (!bar) {
        return;
      }


      /*
       * Criamos o tween uma única vez.
       *
       * Diferente de gsap.to() em todo scroll,
       * quickTo reaproveita a mesma estrutura.
       */

      const scaleTo =
        gsap.quickTo(
          bar,
          "scaleX",
          {
            duration: 0.25,
            ease: "power2.out",
          },
        );


      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );


      const update =
        () => {

          const documentHeight =
            document.documentElement
              .scrollHeight -
            window.innerHeight;


          const progress =
            documentHeight > 0
              ? window.scrollY /
                documentHeight
              : 0;


          /*
           * Reduced motion:
           * atualização direta, sem tween.
           */

          if (
            reducedMotion.matches
          ) {

            gsap.set(
              bar,
              {
                scaleX:
                  progress,
              },
            );

            return;
          }


          scaleTo(
            progress,
          );

        };


      update();


      window.addEventListener(
        "scroll",
        update,
        {
          passive: true,
        },
      );


      window.addEventListener(
        "resize",
        update,
      );


      reducedMotion.addEventListener(
        "change",
        update,
      );


      return () => {

        window.removeEventListener(
          "scroll",
          update,
        );


        window.removeEventListener(
          "resize",
          update,
        );


        reducedMotion
          .removeEventListener(
            "change",
            update,
          );

      };

    },
    [],
  );


  return (
    <div
      className="scroll-progress"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="scroll-progress__bar"
      />
    </div>
  );
}
