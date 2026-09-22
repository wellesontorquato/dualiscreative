"use client";



import { CreatorCredit } from "@/components/layout/CreatorCredit";import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import gsap from "gsap";

import {
  LanguageSwitcher,
} from "@/components/ui/LanguageSwitcher";

import {
  siteCopy,
  type Locale,
} from "@/i18n/site-copy";


type FullscreenMenuProps = {
  locale: Locale;
};


const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");


export function FullscreenMenu({
  locale,
}: FullscreenMenuProps) {

  const [
    open,
    setOpen,
  ] =
    useState(false);


  const menuRef =
    useRef<HTMLDivElement>(
      null,
    );


  const triggerRef =
    useRef<HTMLButtonElement>(
      null,
    );


  const timelineRef =
    useRef<gsap.core.Timeline | null>(
      null,
    );


  const wasOpenRef =
    useRef(false);


  const pathname =
    usePathname();


  const copy =
    siteCopy[locale];


  const menuItems = [
    {
      label:
        locale === "pt"
          ? "Trabalhos"
          : "Work",

      href:
        `/${locale}/work`,

      number:
        "01",
    },

    {
      label:
        locale === "pt"
          ? "Sobre"
          : "About",

      href:
        `/${locale}/about`,

      number:
        "02",
    },

    {
      label:
        locale === "pt"
          ? "Contato"
          : "Contact",

      href:
        `/${locale}/contact`,

      number:
        "03",
    },
  ];


  /*
   * ================================================
   * VISUAL / GSAP
   * ================================================
   */

  useEffect(
    () => {

      const menu =
        menuRef.current;


      if (!menu) {
        return;
      }


      timelineRef.current
        ?.kill();


      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;


      if (open) {

        document.body.classList.add(
          "menu-open",
        );


        gsap.set(
          menu,
          {
            visibility:
              "visible",

            pointerEvents:
              "auto",
          },
        );


        if (
          reducedMotion
        ) {

          gsap.set(
            menu,
            {
              clipPath:
                "inset(0% 0% 0% 0%)",
            },
          );


          gsap.set(
            ".menu-v4__link-label",
            {
              yPercent: 0,
            },
          );


          gsap.set(
            ".menu-v4__aside",
            {
              opacity: 1,
              y: 0,
            },
          );

        }
        else {

          const timeline =
            gsap.timeline();


          timeline
            .fromTo(
              menu,
              {
                clipPath:
                  "inset(0% 0% 100% 0%)",
              },
              {
                clipPath:
                  "inset(0% 0% 0% 0%)",

                duration:
                  0.85,

                ease:
                  "power4.inOut",
              },
            )
            .fromTo(
              ".menu-v4__link-label",
              {
                yPercent:
                  110,
              },
              {
                yPercent:
                  0,

                duration:
                  0.85,

                stagger:
                  0.07,

                ease:
                  "power4.out",
              },
              "-=0.45",
            )
            .fromTo(
              ".menu-v4__aside",
              {
                opacity:
                  0,

                y:
                  20,
              },
              {
                opacity:
                  1,

                y:
                  0,

                duration:
                  0.75,

                ease:
                  "power3.out",
              },
              "-=0.5",
            );


          timelineRef.current =
            timeline;

        }


        wasOpenRef.current =
          true;


        return () => {

          timelineRef.current
            ?.kill();

        };

      }


      document.body.classList.remove(
        "menu-open",
      );


      if (
        reducedMotion
      ) {

        gsap.set(
          menu,
          {
            visibility:
              "hidden",

            pointerEvents:
              "none",

            clipPath:
              "inset(0% 0% 100% 0%)",
          },
        );

      }
      else {

        const timeline =
          gsap.timeline({
            onComplete:
              () => {

                gsap.set(
                  menu,
                  {
                    visibility:
                      "hidden",

                    pointerEvents:
                      "none",
                  },
                );

              },
          });


        timeline.to(
          menu,
          {
            clipPath:
              "inset(0% 0% 100% 0%)",

            duration:
              0.75,

            ease:
              "power4.inOut",
          },
        );


        timelineRef.current =
          timeline;

      }


      if (
        wasOpenRef.current
      ) {

        triggerRef.current
          ?.focus();


        wasOpenRef.current =
          false;

      }


      return () => {

        timelineRef.current
          ?.kill();

      };

    },
    [
      open,
    ],
  );


  /*
   * ================================================
   * TECLADO / FOCUS TRAP
   * ================================================
   */

  useEffect(
    () => {

      if (!open) {
        return;
      }


      const menu =
        menuRef.current;


      const trigger =
        triggerRef.current;


      if (
        !menu ||
        !trigger
      ) {

        return;

      }


      const focusFirstItem =
        window.requestAnimationFrame(
          () => {

            const firstFocusable =
              menu.querySelector<HTMLElement>(
                FOCUSABLE_SELECTOR,
              );


            firstFocusable
              ?.focus();

          },
        );


      const handleKeyDown =
        (
          event:
            KeyboardEvent,
        ) => {

          /*
           * ESC fecha o menu.
           */

          if (
            event.key ===
              "Escape"
          ) {

            event.preventDefault();

            setOpen(
              false,
            );

            return;

          }


          if (
            event.key !==
              "Tab"
          ) {

            return;

          }


          const menuFocusable =
            Array.from(
              menu.querySelectorAll<HTMLElement>(
                FOCUSABLE_SELECTOR,
              ),
            ).filter(
              (element) =>
                !element.hasAttribute(
                  "disabled",
                ) &&
                element.getAttribute(
                  "aria-hidden",
                ) !==
                  "true",
            );


          /*
           * O botão Menu continua sendo o
           * controle de fechamento e faz
           * parte do ciclo de foco.
           */

          const focusable = [
            trigger,
            ...menuFocusable,
          ];


          if (
            focusable.length ===
              0
          ) {

            return;

          }


          const currentIndex =
            focusable.indexOf(
              document.activeElement as HTMLElement,
            );


          if (
            event.shiftKey
          ) {

            if (
              currentIndex <=
                0
            ) {

              event.preventDefault();


              focusable[
                focusable.length -
                  1
              ]?.focus();

            }


            return;

          }


          if (
            currentIndex ===
              focusable.length -
                1
          ) {

            event.preventDefault();


            focusable[
              0
            ]?.focus();

          }

        };


      document.addEventListener(
        "keydown",
        handleKeyDown,
      );


      return () => {

        window.cancelAnimationFrame(
          focusFirstItem,
        );


        document.removeEventListener(
          "keydown",
          handleKeyDown,
        );

      };

    },
    [
      open,
    ],
  );


  /*
   * Se a rota mudar por qualquer motivo,
   * o menu não permanece aberto.
   *
   * A atualização é agendada para o próximo
   * frame para não executar setState de forma
   * síncrona dentro do effect.
   */

  useEffect(
    () => {

      const frameId =
        window.requestAnimationFrame(
          () => {

            setOpen(
              false,
            );

          },
        );


      return () => {

        window.cancelAnimationFrame(
          frameId,
        );

      };

    },
    [
      pathname,
    ],
  );


  const menuLabel =
    locale === "pt"
      ? "Menu de navegação"
      : "Navigation menu";


  const triggerLabel =
    open
      ? locale === "pt"
        ? "Fechar menu"
        : "Close menu"
      : locale === "pt"
        ? "Abrir menu"
        : "Open menu";


  return (
    <>
      <button
        ref={triggerRef}

        className={
          `menu-trigger ${
            open
              ? "menu-trigger--open"
              : ""
          }`
        }

        type="button"

        onClick={
          () =>
            setOpen(
              (current) =>
                !current,
            )
        }

        aria-label={
          triggerLabel
        }

        aria-expanded={
          open
        }

        aria-controls="dualis-fullscreen-menu"
      >
        <span />
        <span />
      </button>


      <div
        id="dualis-fullscreen-menu"

        ref={menuRef}

        className="menu-v4"

        role="dialog"

        aria-modal="true"

        aria-label={
          menuLabel
        }

        aria-hidden={
          !open
        }

        tabIndex={-1}
      >

        <div className="menu-v4__grid" />


        <div className="menu-v4__head">

          <span>
            DUALIS CREATIVE
          </span>


          <div>

            <span>
              {copy.nav.navigation}
            </span>


            <LanguageSwitcher
              locale={locale}
            />

          </div>

        </div>


        <div className="menu-v4__body">

          <nav
            className="menu-v4__nav"
            aria-label={
              menuLabel
            }
          >

            {menuItems.map(
              (item) => (

                <Link
                  key={
                    item.number
                  }

                  href={
                    item.href
                  }

                  className="menu-v4__link"

                  aria-current={
                    pathname ===
                      item.href
                      ? "page"
                      : undefined
                  }

                  onClick={
                    () =>
                      setOpen(
                        false,
                      )
                  }
                >

                  <span>
                    {item.number}
                  </span>


                  <span className="menu-v4__link-mask">

                    <span className="menu-v4__link-label">
                      {item.label}
                    </span>

                  </span>


                  <span
                    aria-hidden="true"
                  >
                    ↗
                  </span>

                </Link>

              ),
            )}

          </nav>


          <aside className="menu-v4__aside">

            <span>
              {locale === "pt"
                ? "Duas perspectivas."
                : "Two perspectives."}
            </span>


            <em>
              {locale === "pt"
                ? "Uma identidade."
                : "One identity."}
            </em>


            <p>
              {copy.about.body}
            </p>

          </aside>

        </div>


        <div className="menu-v4__footer">

          <span>
            {copy.hero.studio}
          </span>


          <div>

            <a href="https://www.instagram.com/dualiscreative/" target="_blank" rel="noreferrer noopener">
              Instagram
            </a>


            <a href="mailto:contato@dualiscreative.com.br">
              E-mail
            </a>

          </div>


          <span>
  <span>{copy.hero.country} · 2026</span>
  <span className="dualis-creator-separator" aria-hidden="true">·</span>
  <CreatorCredit locale={locale} />
</span>

        </div>

      </div>
    </>
  );
}
