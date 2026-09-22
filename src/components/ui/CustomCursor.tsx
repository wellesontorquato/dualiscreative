"use client";

import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";


const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[data-cursor='interactive']",
  "[role='button']",
].join(",");


export function CustomCursor() {

  const cursorRef =
    useRef<HTMLDivElement>(
      null,
    );


  useEffect(
    () => {

      const cursor =
        cursorRef.current;


      if (!cursor) {
        return;
      }


      const finePointer =
        window.matchMedia(
          "(hover: hover) and (pointer: fine)",
        );


      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );


      /*
       * Sem mouse preciso ou com movimento reduzido,
       * preservamos 100% o cursor nativo.
       */

      if (
        !finePointer.matches ||
        reducedMotion.matches
      ) {

        return;

      }


      const root =
        document.documentElement;


      /*
       * Somente AGORA o CSS recebe permissão
       * para esconder o cursor nativo.
       */

      root.classList.add(
        "custom-cursor-enabled",
      );


      gsap.set(
        cursor,
        {
          xPercent: -50,
          yPercent: -50,
          autoAlpha: 0,
        },
      );


      const xTo =
        gsap.quickTo(
          cursor,
          "x",
          {
            duration: 0.35,
            ease: "power3.out",
          },
        );


      const yTo =
        gsap.quickTo(
          cursor,
          "y",
          {
            duration: 0.35,
            ease: "power3.out",
          },
        );


      let hasMoved =
        false;


      const resolveInteractive =
        (
          target:
            EventTarget | null,
        ) => {

          if (
            !(target instanceof Element)
          ) {

            return null;

          }


          return target.closest(
            INTERACTIVE_SELECTOR,
          );

        };


      const handlePointerMove =
        (
          event:
            PointerEvent,
        ) => {

          if (
            !hasMoved
          ) {

            hasMoved =
              true;


            gsap.set(
              cursor,
              {
                autoAlpha: 1,
              },
            );

          }


          xTo(
            event.clientX,
          );


          yTo(
            event.clientY,
          );

        };


      const handlePointerOver =
        (
          event:
            PointerEvent,
        ) => {

          const interactive =
            resolveInteractive(
              event.target,
            );


          if (
            !interactive
          ) {

            return;

          }


          cursor.classList.add(
            "custom-cursor--active",
          );

        };


      const handlePointerOut =
        (
          event:
            PointerEvent,
        ) => {

          const from =
            resolveInteractive(
              event.target,
            );


          if (!from) {
            return;
          }


          const to =
            resolveInteractive(
              event.relatedTarget,
            );


          if (
            from === to
          ) {

            return;

          }


          cursor.classList.remove(
            "custom-cursor--active",
          );

        };


      const handleWindowLeave =
        () => {

          gsap.set(
            cursor,
            {
              autoAlpha: 0,
            },
          );


          hasMoved =
            false;


          cursor.classList.remove(
            "custom-cursor--active",
          );

        };


      window.addEventListener(
        "pointermove",
        handlePointerMove,
        {
          passive: true,
        },
      );


      document.addEventListener(
        "pointerover",
        handlePointerOver,
      );


      document.addEventListener(
        "pointerout",
        handlePointerOut,
      );


      document.documentElement
        .addEventListener(
          "mouseleave",
          handleWindowLeave,
        );


      return () => {

        window.removeEventListener(
          "pointermove",
          handlePointerMove,
        );


        document.removeEventListener(
          "pointerover",
          handlePointerOver,
        );


        document.removeEventListener(
          "pointerout",
          handlePointerOut,
        );


        document.documentElement
          .removeEventListener(
            "mouseleave",
            handleWindowLeave,
          );


        root.classList.remove(
          "custom-cursor-enabled",
        );


        cursor.classList.remove(
          "custom-cursor--active",
        );


        gsap.killTweensOf(
          cursor,
        );

      };

    },
    [],
  );


  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <span />
    </div>
  );
}
