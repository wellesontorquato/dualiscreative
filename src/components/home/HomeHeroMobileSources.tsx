"use client";

import {
  useEffect,
} from "react";


const MOBILE_QUERY =
  "(max-width: 800px)";


/*
 * Os caminhos abaixo foram descobertos
 * automaticamente pelo PowerShell.
 */
const mobileSources = {
  hero:
    "/images/home/hero-mobile.webp",

  hero2:
    "/images/home/hero2-mobile.webp",

  hero3:
    "/images/home/hero3-mobile.webp",
} as const;


type HeroKey =
  keyof typeof mobileSources;


type OriginalState = {
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
};


function decodeValue(
  value:
    string,
) {

  try {

    return decodeURIComponent(
      value,
    );

  }
  catch {

    return value;

  }

}


function sourceText(
  image:
    HTMLImageElement,
) {

  return [
    image.currentSrc,
    image.src,
    image.getAttribute(
      "src",
    ) ?? "",
    image.getAttribute(
      "srcset",
    ) ?? "",
  ]
    .map(
      decodeValue,
    )
    .join(
      " ",
    );

}


function detectDesktopKey(
  image:
    HTMLImageElement,
):
  HeroKey | null {

  const text =
    sourceText(
      image,
    );


  /*
   * Se React/Next acabou de devolver
   * uma fonte desktop, ela tem prioridade
   * sobre qualquer chave anteriormente guardada.
   */

  if (
    /\/images\/home\/hero2\.(?:webp|jpe?g|png)(?:$|[?&#,\s])/i.test(
      text,
    )
  ) {

    return "hero2";

  }


  if (
    /\/images\/home\/hero3\.(?:webp|jpe?g|png)(?:$|[?&#,\s])/i.test(
      text,
    )
  ) {

    return "hero3";

  }


  if (
    /\/images\/home\/hero\.(?:webp|jpe?g|png)(?:$|[?&#,\s])/i.test(
      text,
    ) &&
    !/hero-mobile/i.test(
      text,
    )
  ) {

    return "hero";

  }


  /*
   * Quando o elemento já foi convertido
   * para a imagem mobile, usamos a chave salva.
   */

  const stored =
    image.dataset
      .dualisDesktopHeroKey;


  if (
    stored === "hero" ||
    stored === "hero2" ||
    stored === "hero3"
  ) {

    return stored;

  }


  return null;

}


function isUsingMobileSource(
  image:
    HTMLImageElement,
) {

  return (
    image.dataset
      .dualisMobileHero ===
    "true"
  );

}


export function HomeHeroMobileSources() {

  useEffect(
    () => {

      const mediaQuery =
        window.matchMedia(
          MOBILE_QUERY,
        );


      let observer:
        MutationObserver | null =
          null;


      let disposed =
        false;


      const originalStates =
        new Map<
          HTMLImageElement,
          OriginalState
        >();


      const applying =
        new WeakSet<
          HTMLImageElement
        >();


      const preloadLinks:
        HTMLLinkElement[] =
          [];


      const findRoot =
        () => {

          const top =
            document.querySelector<HTMLElement>(
              "#top",
            );


          if (
            top
          ) {

            return top;

          }


          return document.querySelector<HTMLElement>(
            "main section",
          );

        };


      const rememberDesktopState =
        (
          image:
            HTMLImageElement,
        ) => {

          if (
            isUsingMobileSource(
              image,
            )
          ) {

            return;

          }


          /*
           * Atualizamos o estado sempre que React
           * entrega novamente uma fonte desktop.
           *
           * Isso também suporta Hero que reutilize
           * um mesmo elemento entre slides.
           */

          originalStates.set(
            image,
            {
              src:
                image.getAttribute(
                  "src",
                ),

              srcSet:
                image.getAttribute(
                  "srcset",
                ),

              sizes:
                image.getAttribute(
                  "sizes",
                ),
            },
          );

        };


      const setAttribute =
        (
          element:
            HTMLElement,
          name:
            string,
          value:
            string | null,
        ) => {

          if (
            value === null
          ) {

            element.removeAttribute(
              name,
            );

            return;

          }


          element.setAttribute(
            name,
            value,
          );

        };


      const applyMobile =
        (
          image:
            HTMLImageElement,
        ) => {

          if (
            disposed ||
            !mediaQuery.matches
          ) {

            return;

          }


          const key =
            detectDesktopKey(
              image,
            );


          if (
            !key
          ) {

            return;

          }


          /*
           * Se React acabou de escrever uma
           * fonte desktop, guardamos o estado
           * antes de substituir.
           */

          if (
            !isUsingMobileSource(
              image,
            )
          ) {

            rememberDesktopState(
              image,
            );

          }


          const target =
            mobileSources[
              key
            ];


          image.dataset
            .dualisDesktopHeroKey =
              key;


          if (
            image.getAttribute(
              "src",
            ) === target &&
            !image.hasAttribute(
              "srcset",
            )
          ) {

            image.dataset
              .dualisMobileHero =
                "true";

            return;

          }


          applying.add(
            image,
          );


          /*
           * Next/Image normalmente cria srcset.
           *
           * No mobile queremos o arquivo editorial
           * exato que foi preparado, então srcset
           * e sizes são retirados.
           */

          image.removeAttribute(
            "srcset",
          );


          image.removeAttribute(
            "sizes",
          );


          image.setAttribute(
            "src",
            target,
          );


          image.dataset
            .dualisMobileHero =
              "true";


          image.setAttribute(
            "data-dualis-mobile-hero-key",
            key,
          );


          window.requestAnimationFrame(
            () => {

              applying.delete(
                image,
              );

            },
          );

        };


      const restoreDesktop =
        (
          image:
            HTMLImageElement,
        ) => {

          const original =
            originalStates.get(
              image,
            );


          if (
            !original
          ) {

            return;

          }


          applying.add(
            image,
          );


          setAttribute(
            image,
            "src",
            original.src,
          );


          setAttribute(
            image,
            "srcset",
            original.srcSet,
          );


          setAttribute(
            image,
            "sizes",
            original.sizes,
          );


          delete image.dataset
            .dualisMobileHero;


          delete image.dataset
            .dualisDesktopHeroKey;


          image.removeAttribute(
            "data-dualis-mobile-hero-key",
          );


          window.requestAnimationFrame(
            () => {

              applying.delete(
                image,
              );

            },
          );

        };


      const scan =
        () => {

          const root =
            findRoot();


          if (
            !root
          ) {

            return;

          }


          root
            .querySelectorAll<HTMLImageElement>(
              "img",
            )
            .forEach(
              (
                image,
              ) => {

                const key =
                  detectDesktopKey(
                    image,
                  );


                if (
                  !key
                ) {

                  return;

                }


                if (
                  mediaQuery.matches
                ) {

                  applyMobile(
                    image,
                  );

                }
                else {

                  restoreDesktop(
                    image,
                  );

                }

              },
            );

        };


      const setupObserver =
        () => {

          observer?.disconnect();


          const root =
            findRoot();


          if (
            !root
          ) {

            return;

          }


          observer =
            new MutationObserver(
              (
                mutations,
              ) => {

                let needsScan =
                  false;


                for (
                  const mutation
                  of mutations
                ) {

                  if (
                    mutation.target instanceof
                      HTMLImageElement &&
                    applying.has(
                      mutation.target,
                    )
                  ) {

                    continue;

                  }


                  if (
                    mutation.type ===
                      "childList"
                  ) {

                    needsScan =
                      true;

                    continue;

                  }


                  if (
                    mutation.type ===
                      "attributes" &&
                    mutation.target instanceof
                      HTMLImageElement
                  ) {

                    /*
                     * React/Next pode ter trocado
                     * o slide. A próxima leitura
                     * vai identificar a nova fonte.
                     */

                    delete mutation.target.dataset
                      .dualisMobileHero;


                    needsScan =
                      true;

                  }

                }


                if (
                  needsScan
                ) {

                  window.requestAnimationFrame(
                    scan,
                  );

                }

              },
            );


          observer.observe(
            root,
            {
              subtree:
                true,

              childList:
                true,

              attributes:
                true,

              attributeFilter: [
                "src",
                "srcset",
                "sizes",
              ],
            },
          );

        };


      const handleBreakpoint =
        () => {

          scan();
          setupObserver();

        };


      /*
       * Preload das versões mobile.
       */

      if (
        mediaQuery.matches
      ) {

        Object
          .values(
            mobileSources,
          )
          .forEach(
            (
              source,
            ) => {

              const link =
                document.createElement(
                  "link",
                );


              link.rel =
                "preload";

              link.as =
                "image";

              link.href =
                source;


              link.dataset
                .dualisMobileHeroPreload =
                  "true";


              document.head.appendChild(
                link,
              );


              preloadLinks.push(
                link,
              );

            },
          );

      }


      /*
       * Primeira aplicação.
       */

      scan();
      setupObserver();


      /*
       * Leituras extras porque Next/Image
       * pode estabilizar currentSrc/srcset
       * depois da hidratação.
       */

      const firstFrame =
        window.requestAnimationFrame(
          scan,
        );


      const delayedScan =
        window.setTimeout(
          scan,
          300,
        );


      mediaQuery.addEventListener(
        "change",
        handleBreakpoint,
      );


      return () => {

        disposed =
          true;


        observer?.disconnect();


        window.cancelAnimationFrame(
          firstFrame,
        );


        window.clearTimeout(
          delayedScan,
        );


        mediaQuery.removeEventListener(
          "change",
          handleBreakpoint,
        );


        originalStates.forEach(
          (
            _state,
            image,
          ) => {

            restoreDesktop(
              image,
            );

          },
        );


        preloadLinks.forEach(
          (
            link,
          ) => {

            link.remove();

          },
        );


        originalStates.clear();

      };

    },
    [],
  );


  return null;
}
