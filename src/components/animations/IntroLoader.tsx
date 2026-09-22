"use client";

import Image from "next/image";
import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

import {
  siteCopy,
  type Locale,
} from "@/i18n/site-copy";

type IntroLoaderProps = {
  locale: Locale;
};

export function IntroLoader({
  locale,
}: IntroLoaderProps) {
  const [visible, setVisible] =
    useState(true);

  const rootRef =
    useRef<HTMLDivElement>(null);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const leftRef =
    useRef<HTMLDivElement>(null);

  const rightRef =
    useRef<HTMLDivElement>(null);

  const taglineRef =
    useRef<HTMLParagraphElement>(null);

  const lineRef =
    useRef<HTMLDivElement>(null);

  const indexRef =
    useRef<HTMLSpanElement>(null);

  const copy = siteCopy[locale];

  useLayoutEffect(() => {
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    /*
     * Reduced motion:
     * não exibimos nem animamos o loader.
     */

    if (reducedMotion) {
      rootRef.current?.style.setProperty(
        "display",
        "none",
      );

      document.body.classList.remove(
        "is-loading",
      );

      window.dispatchEvent(
        new Event(
          "dualis:intro-complete",
        ),
      );

      const frameId =
        window.requestAnimationFrame(
          () => {
            setVisible(false);
          },
        );

      return () => {
        window.cancelAnimationFrame(
          frameId,
        );
      };
    }

    document.body.classList.add(
      "is-loading",
    );

    const ctx = gsap.context(() => {
      /*
       * O conteúdo chega do HTML invisível.
       * Somente depois que todas as posições
       * iniciais são configuradas nós mostramos.
       *
       * Isso evita completamente o flash inicial.
       */

      gsap.set(leftRef.current, {
        xPercent: -22,
        opacity: 0,
        filter: "blur(12px)",
      });

      gsap.set(rightRef.current, {
        xPercent: 22,
        opacity: 0,
        filter: "blur(12px)",
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        opacity: 0,
        transformOrigin: "center center",
      });

      gsap.set(taglineRef.current, {
        y: 14,
        opacity: 0,
      });

      gsap.set(indexRef.current, {
        opacity: 0,
      });

      /*
       * Só agora o loader fica visível.
       */

      gsap.set(contentRef.current, {
        visibility: "visible",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline

        /*
         * As duas metades entram
         * simultaneamente e terminam
         * EXATAMENTE em xPercent 0.
         */

        .to(
          leftRef.current,
          {
            xPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.15,
          },
        )

        .to(
          rightRef.current,
          {
            xPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.15,
          },
          "<",
        )

        /*
         * Linha central.
         */

        .to(
          lineRef.current,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.28",
        )

        /*
         * Assinatura.
         */

        .to(
          taglineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.4",
        )

        /*
         * Índice inferior.
         */

        .to(
          indexRef.current,
          {
            opacity: 1,
            duration: 0.45,
          },
          "-=0.42",
        )

        /*
         * Pequena pausa para a marca
         * respirar antes da transição.
         */

        .to(
          {},
          {
            duration: 0.55,
          },
        )

        /*
         * A tela preta sobe e revela
         * a Home.
         */

        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: 1.15,
            ease: "power4.inOut",

            onComplete: () => {
              document.body.classList.remove(
                "is-loading",
              );

              /*
               * Hero e Header escutam este evento.
               * Não existe mais temporização artificial.
               */

              window.dispatchEvent(
                new Event(
                  "dualis:intro-complete",
                ),
              );

              setVisible(false);
            },
          },
        );
    }, rootRef);

    return () => {
      ctx.revert();

      document.body.classList.remove(
        "is-loading",
      );
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="intro-loader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <div className="intro-loader__ambient" />

      <div
        ref={contentRef}
        className="intro-loader__content"
        style={{
          visibility: "hidden",
        }}
      >
        <div className="intro-loader__logo">
          <div
            ref={leftRef}
            className="intro-loader__logo-piece intro-loader__logo-piece--left"
          >
            <Image
              src="/brand/dualis-logo-transparent.png"
              alt=""
              width={980}
              height={300}
              priority
            />
          </div>

          <div
            ref={rightRef}
            className="intro-loader__logo-piece intro-loader__logo-piece--right"
          >
            <Image
              src="/brand/dualis-logo-transparent.png"
              alt=""
              width={980}
              height={300}
              priority
            />
          </div>
        </div>

        <div
          ref={lineRef}
          className="intro-loader__line"
        />

        <p
          ref={taglineRef}
          className="intro-loader__tagline"
        >
          {copy.hero.line1}{" "}
          {copy.hero.line2}
        </p>
      </div>

      <span
        ref={indexRef}
        className="intro-loader__index"
      >
        01 — 02
      </span>
    </div>
  );
}
