"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  Locale,
} from "@/i18n/site-copy";


type HeroProps = {
  locale: Locale;
};


type HeaderTheme =
  | "dark"
  | "light";


const HERO_SLIDES = [
  "/images/home/hero.webp",
  "/images/home/hero2.webp",
  "/images/home/hero3.webp",
] as const;


const HERO_INTERVAL =
  6500;


const heroCopy = {
  pt: {
    photography:
      "Fotografia",

    film:
      "Filme",

    work:
      "Trabalhos",

    about:
      "Sobre",

    contact:
      "Contato",

    navigation:
      "Navegação principal",

    openMenu:
      "Abrir menu",

    closeMenu:
      "Fechar menu",

    brandAria:
      "Dualis Creative",
  },

  en: {
    photography:
      "Photography",

    film:
      "Film",

    work:
      "Work",

    about:
      "About",

    contact:
      "Contact",

    navigation:
      "Primary navigation",

    openMenu:
      "Open menu",

    closeMenu:
      "Close menu",

    brandAria:
      "Dualis Creative",
  },
} as const;


const segmentSizes = [
  "long",
  "long",
  "medium",
  "small",
  "small",
  "small",
  "tiny",
  "tiny",
  "tiny",
] as const;


export function Hero({
  locale,
}: HeroProps) {

  const copy =
    heroCopy[
      locale
    ];


  const otherLocale: Locale =
    locale === "pt"
      ? "en"
      : "pt";


  const heroRef =
    useRef<HTMLElement>(
      null,
    );


  const menuRef =
    useRef<HTMLDivElement>(
      null,
    );


  const [
    menuOpen,
    setMenuOpen,
  ] =
    useState(
      false,
    );


  const [
    isReady,
    setIsReady,
  ] =
    useState(
      false,
    );


  const [
    headerTheme,
    setHeaderTheme,
  ] =
    useState<HeaderTheme>(
      "dark",
    );


  /*
   * hero.webp é garantido.
   *
   * hero2.webp e hero3.webp só entram
   * se realmente conseguirem carregar.
   */

  const [
    availableSlides,
    setAvailableSlides,
  ] =
    useState<string[]>(
      [
        HERO_SLIDES[0],
      ],
    );


  const [
    activeSlide,
    setActiveSlide,
  ] =
    useState<string>(
      HERO_SLIDES[0],
    );


  const navItems = [
    {
      key:
        "work",

      label:
        copy.work,

      href:
        `/${locale}/work`,
    },

    {
      key:
        "about",

      label:
        copy.about,

      href:
        `/${locale}/about`,
    },

    {
      key:
        "contact",

      label:
        copy.contact,

      href:
        `/${locale}/contact`,
    },
  ];


  /*
   * =====================================================
   * PRELOAD DOS SLIDES OPCIONAIS
   * =====================================================
   *
   * Isso permite preparar agora hero2 e hero3.
   *
   * Se ainda não existem:
   * - não entram no slideshow.
   *
   * Quando forem colocados na pasta e a página
   * for atualizada:
   * - passam a entrar automaticamente.
   */

  useEffect(
    () => {

      let cancelled =
        false;


      const optionalSlides =
        HERO_SLIDES.slice(
          1,
        );


      const preloaders =
        optionalSlides.map(
          (
            src,
          ) => {

            const preloader =
              new window.Image();


            preloader.onload =
              () => {

                if (
                  cancelled
                ) {

                  return;
                }


                setAvailableSlides(
                  (
                    current,
                  ) => {

                    if (
                      current.includes(
                        src,
                      )
                    ) {

                      return current;
                    }


                    return [
                      ...current,
                      src,
                    ];

                  },
                );

              };


            preloader.src =
              src;


            return preloader;

          },
        );


      return () => {

        cancelled =
          true;


        preloaders.forEach(
          (
            preloader,
          ) => {

            preloader.onload =
              null;

          },
        );

      };

    },
    [],
  );


  /*
   * =====================================================
   * SLIDESHOW
   * =====================================================
   */

  useEffect(
    () => {

      if (
        availableSlides.length <=
        1
      ) {

        return;
      }


      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;


      if (
        reducedMotion
      ) {

        return;
      }


      const timer =
        window.setInterval(
          () => {

            setActiveSlide(
              (
                current,
              ) => {

                const currentIndex =
                  availableSlides.indexOf(
                    current,
                  );


                const nextIndex =
                  currentIndex < 0
                    ? 0
                    : (
                        currentIndex +
                        1
                      ) %
                      availableSlides.length;


                return (
                  availableSlides[
                    nextIndex
                  ] ??
                  availableSlides[
                    0
                  ]
                );

              },
            );

          },
          HERO_INTERVAL,
        );


      return () => {

        window.clearInterval(
          timer,
        );

      };

    },
    [
      availableSlides,
    ],
  );


  /*
   * =====================================================
   * INTRO
   * =====================================================
   */

  useEffect(
    () => {

      let frame =
        0;


      const activate =
        () => {

          frame =
            window.requestAnimationFrame(
              () => {

                setIsReady(
                  true,
                );

              },
            );

        };


      if (
        document.body.classList.contains(
          "is-loading",
        )
      ) {

        window.addEventListener(
          "dualis:intro-complete",
          activate,
          {
            once:
              true,
          },
        );

      }
      else {

        activate();

      }


      return () => {

        window.removeEventListener(
          "dualis:intro-complete",
          activate,
        );


        if (
          frame
        ) {

          window.cancelAnimationFrame(
            frame,
          );

        }

      };

    },
    [],
  );


  /*
   * =====================================================
   * FADE DO TEXTO AO DESCER
   * =====================================================
   */

  useEffect(
    () => {

      const hero =
        heroRef.current;


      if (
        !hero
      ) {

        return;
      }


      let frame =
        0;


      const update =
        () => {

          frame =
            0;


          const rect =
            hero.getBoundingClientRect();


          const travelled =
            Math.max(
              -rect.top,
              0,
            );


          const fadeDistance =
            Math.max(
              window.innerHeight *
              0.66,
              520,
            );


          const progress =
            Math.min(
              travelled /
              fadeDistance,
              1,
            );


          hero.style.setProperty(
            "--hero-scroll-progress",
            progress.toFixed(
              4,
            ),
          );

        };


      const requestUpdate =
        () => {

          if (
            frame
          ) {

            return;
          }


          frame =
            window.requestAnimationFrame(
              update,
            );

        };


      requestUpdate();


      window.addEventListener(
        "scroll",
        requestUpdate,
        {
          passive:
            true,
        },
      );


      window.addEventListener(
        "resize",
        requestUpdate,
      );


      return () => {

        window.removeEventListener(
          "scroll",
          requestUpdate,
        );


        window.removeEventListener(
          "resize",
          requestUpdate,
        );


        if (
          frame
        ) {

          window.cancelAnimationFrame(
            frame,
          );

        }

      };

    },
    [],
  );


  /*
   * =====================================================
   * COR DO HEADER CONFORME FUNDO
   * =====================================================
   */

  useEffect(
    () => {

      let frame =
        0;


      const update =
        () => {

          frame =
            0;


          const probeY =
            48;


          const sections =
            Array.from(
              document.querySelectorAll<HTMLElement>(
                "[data-header-theme]",
              ),
            );


          let nextTheme:
            HeaderTheme =
              "dark";


          for (
            const section
            of sections
          ) {

            const rect =
              section.getBoundingClientRect();


            if (
              rect.top <=
                probeY &&
              rect.bottom >
                probeY
            ) {

              nextTheme =
                section.dataset.headerTheme ===
                "light"
                  ? "light"
                  : "dark";


              break;

            }

          }


          setHeaderTheme(
            (
              current,
            ) =>
              current ===
              nextTheme
                ? current
                : nextTheme,
          );

        };


      const requestUpdate =
        () => {

          if (
            frame
          ) {

            return;
          }


          frame =
            window.requestAnimationFrame(
              update,
            );

        };


      requestUpdate();


      window.addEventListener(
        "scroll",
        requestUpdate,
        {
          passive:
            true,
        },
      );


      window.addEventListener(
        "resize",
        requestUpdate,
      );


      return () => {

        window.removeEventListener(
          "scroll",
          requestUpdate,
        );


        window.removeEventListener(
          "resize",
          requestUpdate,
        );


        if (
          frame
        ) {

          window.cancelAnimationFrame(
            frame,
          );

        }

      };

    },
    [],
  );


  /*
   * =====================================================
   * MENU MOBILE
   * =====================================================
   */

  useEffect(
    () => {

      if (
        !menuOpen
      ) {

        return;
      }


      const menu =
        menuRef.current;


      if (
        !menu
      ) {

        return;
      }


      const previousFocus =
        document.activeElement
          instanceof HTMLElement
          ? document.activeElement
          : null;


      const getFocusable =
        () =>
          Array.from(
            menu.querySelectorAll<HTMLElement>(
              [
                'a[href]',
                'button:not([disabled])',
              ].join(
                ",",
              ),
            ),
          );


      const focusables =
        getFocusable();


      const focusFrame =
        window.requestAnimationFrame(
          () => {

            focusables[
              0
            ]?.focus();

          },
        );


      const handleKeyDown =
        (
          event:
            KeyboardEvent,
        ) => {

          if (
            event.key ===
            "Escape"
          ) {

            event.preventDefault();

            setMenuOpen(
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


          const items =
            getFocusable();


          if (
            items.length ===
            0
          ) {

            event.preventDefault();

            return;
          }


          const first =
            items[
              0
            ];


          const last =
            items[
              items.length -
              1
            ];


          if (
            event.shiftKey &&
            document.activeElement ===
              first
          ) {

            event.preventDefault();

            last.focus();

            return;
          }


          if (
            !event.shiftKey &&
            document.activeElement ===
              last
          ) {

            event.preventDefault();

            first.focus();

          }

        };


      document.body.style.overflow =
        "hidden";


      document.addEventListener(
        "keydown",
        handleKeyDown,
      );


      return () => {

        window.cancelAnimationFrame(
          focusFrame,
        );


        document.body.style.overflow =
          "";


        document.removeEventListener(
          "keydown",
          handleKeyDown,
        );


        previousFocus?.focus();

      };

    },
    [
      menuOpen,
    ],
  );


  return (
    <>
      {/*
       * ===================================================
       * FIXED HEADER
       * ===================================================
       */}

      <header
        className={
          [
            "dualis-v72__top",
            `dualis-v72__top--${headerTheme}`,
            isReady
              ? "is-ready"
              : "",
          ].join(
            " ",
          )
        }
      >
        <Link
          href={
            `/${locale}`
          }

          className="dualis-v72__brand"

          aria-label={
            copy.brandAria
          }
        >
          <span
            className="dualis-v72__brand-lockup"
          >
            <strong>
              DUALIS
            </strong>

            <strong>
              CREATIVE
            </strong>
          </span>
        </Link>


        <div
          className="dualis-v72__desktop-shell"
        >
          <nav
            className="dualis-v72__desktop-nav"

            aria-label={
              copy.navigation
            }
          >
            {
              navItems.map(
                (
                  item,
                ) => (

                  <Link
                    key={
                      item.key
                    }

                    href={
                      item.href
                    }

                    className="dualis-v72__nav-link"
                  >
                    <span
                      className={
                        `dualis-v72__nav-symbol dualis-v72__nav-symbol--${item.key}`
                      }

                      aria-hidden="true"
                    />

                    <span>
                      {
                        item.label
                      }
                    </span>

                    {
                      item.key ===
                        "work"
                        ? (
                          <span
                            className="dualis-v72__work-arrow"

                            aria-hidden="true"
                          >
                            ↓
                          </span>
                        )
                        : null
                    }
                  </Link>

                ),
              )
            }
          </nav>


          <div
            className="dualis-v72__locale"
          >
            <Link
              href="/pt"

              className={
                locale === "pt"
                  ? "is-active"
                  : ""
              }
            >
              PT
            </Link>

            <span>
              /
            </span>

            <Link
              href="/en"

              className={
                locale === "en"
                  ? "is-active"
                  : ""
              }
            >
              EN
            </Link>
          </div>
        </div>


        <button
          type="button"

          className="dualis-v72__mobile-trigger"

          aria-label={
            copy.openMenu
          }

          aria-expanded={
            menuOpen
          }

          aria-controls="dualis-v72-mobile-menu"

          onClick={
            () =>
              setMenuOpen(
                true,
              )
          }
        >
          <span />
          <span />
        </button>
      </header>

      {/* DUALIS_HOME_NAV_FINAL_START */}

      {/*
       * TRABALHOS / SOBRE / CONTATO
       *
       * Esta camada inteira recebe difference,
       * exatamente como as barras do Hero.
       *
       * O locale interno e invisivel e existe
       * somente para preservar a geometria.
       */}

      <div
        className="dualis-home-final-nav"
      >
        <nav
          className="dualis-home-final-nav__links"

          aria-label={
            copy.navigation
          }
        >
          {
            navItems.map(
              (
                item,
              ) => (

                <Link
                  key={
                    item.key
                  }

                  href={
                    item.href
                  }

                  className="dualis-home-final-nav__link"
                >
                  {
                    item.label
                  }
                </Link>

              ),
            )
          }
        </nav>


        <div
          className="dualis-home-final-nav__locale dualis-home-final-nav__locale-placeholder"

          aria-hidden="true"
        >
          <span>
            PT
          </span>

          <span>
            /
          </span>

          <span>
            EN
          </span>
        </div>
      </div>


      {/*
       * PT / EN real.
       *
       * Fica fora da camada difference para manter
       * exatamente o comportamento preto/branco
       * que ja estava correto.
       */}

      <div
        className={
          `dualis-home-final-nav__locale-live dualis-home-final-nav__locale-live--${headerTheme}`
        }
      >
        <Link
          href="/pt"

          className={
            locale === "pt"
              ? "is-active"
              : ""
          }
        >
          PT
        </Link>

        <span>
          /
        </span>

        <Link
          href="/en"

          className={
            locale === "en"
              ? "is-active"
              : ""
          }
        >
          EN
        </Link>
      </div>

      {/* DUALIS_HOME_NAV_FINAL_END */}

      


      {/*
       * ===================================================
       * BARRAS FIXAS
       *
       * Separadas do header para que o próprio grupo
       * possa usar difference diretamente contra
       * aquilo que estiver atrás dele.
       * ===================================================
       */}

      <div
        className={
          `dualis-v74__segments${isReady ? " is-ready" : ""}`
        }

        aria-hidden="true"
      >
        {
          segmentSizes.map(
            (
              size,
              index,
            ) => (

              <span
                key={
                  `${size}-${index}`
                }

                className={
                  `dualis-v74__segment dualis-v74__segment--${size}`
                }
              />

            ),
          )
        }
      </div>


      {/*
       * ===================================================
       * HERO
       * ===================================================
       */}

      <section
        ref={
          heroRef
        }

        id="top"

        className={
          `dualis-v72${isReady ? " is-ready" : ""}`
        }

        data-header-theme="dark"
      >
        {/*
         * Todos os slides disponíveis ficam empilhados.
         * Apenas o ativo possui opacity 1.
         */}

        {
          availableSlides.map(
            (
              src,
              index,
            ) => (

              <Image
                key={
                  src
                }

                src={
                  src
                }

                alt=""

                fill

                priority={
                  index ===
                  0
                }

                quality={
                  95
                }

                sizes="100vw"

                className={
                  [
                    "dualis-v72__image",
                    "dualis-v74__slide",
                    activeSlide ===
                      src
                      ? "is-active"
                      : "",
                  ].join(
                    " ",
                  )
                }

                aria-hidden="true"
              />

            ),
          )
        }


        <div
          className="dualis-v72__overlay"

          aria-hidden="true"
        />


        <div
          className="dualis-v72__grid"

          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>


        <div
          className="dualis-v72__cross"

          aria-hidden="true"
        >
          <span />
          <span />
        </div>


        <div
          className="dualis-v72__words"

          aria-hidden="true"
        >
          <div
            className="dualis-v72__word-row"
          >
            <span
              className="dualis-v72__word dualis-v72__word--one"
            >
              {
                copy.photography
              }
            </span>
          </div>


          <div
            className="dualis-v72__word-row dualis-v72__word-row--two"
          >
            <span
              className="dualis-v72__word dualis-v72__word--two"
            >
              {
                copy.film
              }
            </span>
          </div>
        </div>
      </section>


      {/*
       * ===================================================
       * MOBILE MENU
       * ===================================================
       */}

      {
        menuOpen
          ? (
            <div
              ref={
                menuRef
              }

              id="dualis-v72-mobile-menu"

              className="dualis-v72__mobile-menu"

              role="dialog"

              aria-modal="true"

              aria-label={
                copy.navigation
              }
            >
              <div
                className="dualis-v72__mobile-head"
              >
                <div
                  className="dualis-v72__mobile-brand"
                >
                  <span>
                    DUALIS
                  </span>

                  <span>
                    CREATIVE
                  </span>

                  <small>
                    01
                  </small>
                </div>


                <button
                  type="button"

                  aria-label={
                    copy.closeMenu
                  }

                  onClick={
                    () =>
                      setMenuOpen(
                        false,
                      )
                  }
                >
                  <span />

                  <span />
                </button>
              </div>


              <nav
                className="dualis-v72__mobile-nav"

                aria-label={
                  copy.navigation
                }
              >
                {
                  navItems.map(
                    (
                      item,
                      index,
                    ) => (

                      <Link
                        key={
                          item.key
                        }

                        href={
                          item.href
                        }

                        onClick={
                          () =>
                            setMenuOpen(
                              false,
                            )
                        }
                      >
                        <small>
                          {
                            String(
                              index +
                              1,
                            ).padStart(
                              2,
                              "0",
                            )
                          }
                        </small>

                        <strong>
                          {
                            item.label
                          }
                        </strong>

                        <span
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </Link>

                    ),
                  )
                }
              </nav>


              <div
                className="dualis-v72__mobile-locale"
              >
                <Link
                  href={
                    `/${locale}`
                  }

                  onClick={
                    () =>
                      setMenuOpen(
                        false,
                      )
                  }
                >
                  {
                    locale.toUpperCase()
                  }
                </Link>

                <span>
                  /
                </span>

                <Link
                  href={
                    `/${otherLocale}`
                  }

                  onClick={
                    () =>
                      setMenuOpen(
                        false,
                      )
                  }
                >
                  {
                    otherLocale.toUpperCase()
                  }
                </Link>
              </div>
            </div>
          )
          : null
      }
    </>
  );
}
