"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  FullscreenMenu,
} from "@/components/layout/FullscreenMenu";

import {
  LanguageSwitcher,
} from "@/components/ui/LanguageSwitcher";

import {
  siteCopy,
  type Locale,
} from "@/i18n/site-copy";


type HeaderTone =
  | "dark"
  | "light"
  | "auto";


type ResolvedTone =
  | "dark"
  | "light";


type SiteHeaderProps = {
  locale: Locale;

  tone?: HeaderTone;

  /*
   * Mantido apenas por compatibilidade
   * com chamadas antigas.
   *
   * Nas paginas internas o header
   * aparece imediatamente.
   */
  waitForIntro?: boolean;
};


const navigationCopy = {
  pt: {
    work:
      "Trabalhos",

    about:
      "Sobre",

    contact:
      "Contato",

    navigation:
      "Navegação principal",
  },

  en: {
    work:
      "Work",

    about:
      "About",

    contact:
      "Contact",

    navigation:
      "Primary navigation",
  },
} as const;


/*
 * =====================================================
 * COLOR HELPERS
 * =====================================================
 */


function parseRgb(
  value:
    string,
): {
  r: number;
  g: number;
  b: number;
  a: number;
} | null {

  const match =
    value.match(
      /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i,
    );


  if (
    !match
  ) {

    return null;
  }


  const r =
    Number(
      match[1],
    );


  const g =
    Number(
      match[2],
    );


  const b =
    Number(
      match[3],
    );


  const a =
    match[4] ===
    undefined
      ? 1
      : Number(
          match[4],
        );


  if (
    !Number.isFinite(
      r,
    ) ||
    !Number.isFinite(
      g,
    ) ||
    !Number.isFinite(
      b,
    ) ||
    !Number.isFinite(
      a,
    )
  ) {

    return null;
  }


  return {
    r,
    g,
    b,
    a,
  };

}


function rgbToTheme(
  r:
    number,

  g:
    number,

  b:
    number,
): ResolvedTone {

  /*
   * Luminancia perceptual.
   *
   * Fundo claro -> header preto.
   * Fundo escuro -> header branco.
   */

  const luminance =
    (
      r *
      0.2126
    ) +
    (
      g *
      0.7152
    ) +
    (
      b *
      0.0722
    );


  return (
    luminance >
    145
      ? "light"
      : "dark"
  );

}


/*
 * Tenta descobrir o fundo realmente
 * renderizado atrás do centro do header.
 */

function detectRenderedBackgroundTheme():
  ResolvedTone | null {

  const probeX =
    Math.round(
      window.innerWidth /
      2,
    );


  const probeY =
    Math.max(
      20,
      Math.min(
        52,
        window.innerHeight *
        0.06,
      ),
    );


  const elements =
    document.elementsFromPoint(
      probeX,
      probeY,
    );


  for (
    const element
    of elements
  ) {

    if (
      !(element instanceof HTMLElement)
    ) {

      continue;
    }


    /*
     * Ignoramos o proprio menu.
     */

    if (
      element.closest(
        ".site-header",
      )
    ) {

      continue;
    }


    const styles =
      window.getComputedStyle(
        element,
      );


    const parsed =
      parseRgb(
        styles.backgroundColor,
      );


    if (
      !parsed ||
      parsed.a <
        0.15
    ) {

      continue;
    }


    return rgbToTheme(
      parsed.r,
      parsed.g,
      parsed.b,
    );

  }


  /*
   * Último fallback: body.
   */

  const bodyColor =
    parseRgb(
      window.getComputedStyle(
        document.body,
      ).backgroundColor,
    );


  if (
    bodyColor &&
    bodyColor.a >=
      0.15
  ) {

    return rgbToTheme(
      bodyColor.r,
      bodyColor.g,
      bodyColor.b,
    );

  }


  return null;

}


/*
 * =====================================================
 * COMPONENT
 * =====================================================
 */


export function SiteHeader({
  locale,
  tone = "auto",
}: SiteHeaderProps) {

  const copy =
    siteCopy[
      locale
    ];


  const navCopy =
    navigationCopy[
      locale
    ];


  /*
   * As páginas institucionais são
   * predominantemente claras.
   *
   * Isso também evita aquele primeiro
   * frame branco-sobre-branco de /work.
   *
   * Nas páginas de projeto escuras,
   * o detector corrige no primeiro RAF.
   */

  const [
    automaticTone,
    setAutomaticTone,
  ] =
    useState<ResolvedTone>(
      "light",
    );


  const resolvedTone:
    ResolvedTone =
      tone === "auto"
        ? automaticTone
        : tone;


  /*
   * =====================================================
   * THEME DETECTION
   * =====================================================
   *
   * PRIORIDADE:
   *
   * 1. data-header-theme no elemento/section
   *    realmente sob o menu.
   *
   * 2. cor real renderizada naquele ponto.
   *
   * 3. body.
   *
   * Isso deixa /work, /about e /contact
   * independentes de uma marcação perfeita
   * em todas as sections.
   */

  useEffect(
    () => {

      if (
        tone !== "auto"
      ) {

        return;
      }


      let frame =
        0;


      const detectTheme =
        (): ResolvedTone => {

          const probeY =
            Math.max(
              20,
              Math.min(
                58,
                window.innerHeight *
                0.07,
              ),
            );


          const themedSections =
            Array.from(
              document.querySelectorAll<HTMLElement>(
                "[data-header-theme]",
              ),
            );


          /*
           * Pode haver um container pai
           * e uma section filha cobrindo
           * o mesmo ponto.
           *
           * Pegamos o menor elemento:
           * normalmente é a section específica,
           * não o wrapper da página inteira.
           */

          const candidates =
            themedSections
              .map(
                (
                  element,
                ) => ({
                  element,
                  rect:
                    element.getBoundingClientRect(),
                }),
              )
              .filter(
                (
                  item,
                ) =>
                  item.rect.top <=
                    probeY &&
                  item.rect.bottom >
                    probeY &&
                  item.rect.height >
                    0,
              )
              .sort(
                (
                  a,
                  b,
                ) =>
                  a.rect.height -
                  b.rect.height,
              );


          const currentSection =
            candidates[
              0
            ];


          if (
            currentSection
          ) {

            return (
              currentSection.element.dataset.headerTheme ===
              "light"
                ? "light"
                : "dark"
            );

          }


          /*
           * Se não existe marcador naquele ponto,
           * lemos o fundo real da página.
           *
           * É isso que corrige especificamente
           * o topo claro de /work.
           */

          const renderedTheme =
            detectRenderedBackgroundTheme();


          if (
            renderedTheme
          ) {

            return renderedTheme;

          }


          /*
           * Fallback conservador para as
           * páginas institucionais.
           */

          return "light";

        };


      const update =
        () => {

          frame =
            0;


          const nextTone =
            detectTheme();


          setAutomaticTone(
            (
              current,
            ) =>
              current ===
              nextTone
                ? current
                : nextTone,
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


      /*
       * Primeira leitura imediatamente
       * após montagem.
       */

      requestUpdate();


      /*
       * Segunda leitura após o layout
       * estabilizar.
       *
       * Corrige páginas cuja geometria
       * termina de montar depois do
       * primeiro paint.
       */

      const settleTimer =
        window.setTimeout(
          requestUpdate,
          120,
        );


      /*
       * Terceira leitura depois da
       * transição de rota.
       */

      const finalTimer =
        window.setTimeout(
          requestUpdate,
          700,
        );


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

        window.clearTimeout(
          settleTimer,
        );


        window.clearTimeout(
          finalTimer,
        );


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
    [
      tone,
    ],
  );


  const navItems = [
    {
      key:
        "work",

      label:
        navCopy.work,

      href:
        `/${locale}/work`,
    },

    {
      key:
        "about",

      label:
        navCopy.about,

      href:
        `/${locale}/about`,
    },

    {
      key:
        "contact",

      label:
        navCopy.contact,

      href:
        `/${locale}/contact`,
    },
  ];


  return (
    <header
      className={
        [
          "site-header",
          "inner-site-header",
          `site-header--${resolvedTone}`,
          `inner-site-header--${resolvedTone}`,
        ].join(
          " ",
        )
      }
    >

      <Link
        className="inner-site-header__brand"

        href={
          `/${locale}`
        }

        aria-label="Dualis Creative"
      >
        <span
          className="inner-site-header__brand-lockup"
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
        className="inner-site-header__desktop"
      >
        <nav
          className="inner-site-header__nav"

          aria-label={
            navCopy.navigation
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

                  className="inner-site-header__nav-link"
                >
                  <span>
                    {
                      item.label
                    }
                  </span>
                </Link>

              ),
            )
          }
        </nav>


        <div
          className="inner-site-header__locale"
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


      <div
        className="inner-site-header__mobile"
      >
        <LanguageSwitcher
          locale={
            locale
          }
        />


        <span
          className="site-header__availability"
        >
          {
            copy.header.availability
          }
        </span>


        <FullscreenMenu
          locale={
            locale
          }
        />
      </div>

    </header>
  );
}
