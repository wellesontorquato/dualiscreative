import {
  FaceAwareMedia,
} from "@/components/media/FaceAwareMedia";

import {
  homeMediaBySlug,
} from "@/data/home-media";

import {
  projects,
} from "@/data/projects";

import {
  siteCopy,
  type Locale,
} from "@/i18n/site-copy";


type SelectedWorkProps = {
  locale: Locale;
};


const fallbackMedia = [
  homeMediaBySlug[
    "15-anos"
  ],

  homeMediaBySlug[
    "editorial-casamentos"
  ],

  homeMediaBySlug[
    "fotos-institucionais"
  ],

  homeMediaBySlug[
    "eventos-externos-palestras"
  ],
];


export function SelectedWork({
  locale,
}: SelectedWorkProps) {

  const copy =
    siteCopy[locale];


    /*
   * HOME TEM EXATAMENTE
   * 4 PROJETOS.
   *
   * Cada um:
   * - 1 fotografia
   * - 1 vídeo
   *
   * TOTAL = 8 CARDS.
   */

  const homeProjects =
    projects.slice(
      0,
      4,
    );


  return (
    <section
      id="work"
      className="dualis-work home-work"
      data-header-theme="light"
    >

      <header className="dualis-section-head">

        <div className="dualis-section-head__index">

          <span>
            01
          </span>

          <span>
            {copy.work.eyebrow}
          </span>

        </div>


        <h2>
          {copy.work.intro}
        </h2>

      </header>


      <div className="home-work__projects">

        {homeProjects.map(
          (
            project,
            index,
          ) => {

            /*
             * NUNCA retornamos null.
             *
             * Se um slug mudar no futuro,
             * usamos a mídia equivalente
             * pela posição.
             */

            const media =
              homeMediaBySlug[
                project.slug
              ] ??
              fallbackMedia[
                index %
                fallbackMedia.length
              ];


            const projectHref =
              `/${locale}/work/${project.slug}`;


            return (
              <article
                className="home-work-project"
                key={
                  project.slug
                }
              >

                <div className="home-work-project__meta">

                  <span>
                    {project.number}
                  </span>

                  <span>
                    {
                      project.category[
                        locale
                      ]
                    }
                  </span>

                  <span>
                    {project.year}
                  </span>

                </div>


                <div className="home-work-project__cards">

                  {/*
                   * =========================================
                   * CARD 1 / FOTOGRAFIA
                   * =========================================
                   */}

                  <a
                    href={projectHref}
                    className="home-work-card home-work-card--photo"
                  >

                    <div className="home-work-card__media">

                      <FaceAwareMedia
                        key={
                          `${project.slug}-photo-${media.photo.src}`
                        }
                        kind="image"
                        src={
                          media.photo.src
                        }
                        alt={
                          media.photo.alt[
                            locale
                          ]
                        }
                        fallbackFocus={
                          media.photo.focus
                        }
                      />

                    </div>


                    <div className="home-work-card__caption">

                      <div>
                        <span className="home-work-card__kind">
                          {locale ===
                          "pt"
                            ? "Fotografia"
                            : "Photography"}
                        </span>

                        <strong>
                          {
                            project.title[
                              locale
                            ]
                          }
                        </strong>
                      </div>

                      <span className="home-work-card__arrow">
                        ↗
                      </span>

                    </div>

                  </a>


                  {/*
                   * =========================================
                   * CARD 2 / VÍDEO
                   * =========================================
                   */}

                  <a
                    href={projectHref}
                    className="home-work-card home-work-card--video"
                  >

                    <div className="home-work-card__media">

                      <FaceAwareMedia
                        key={
                          `${project.slug}-video-${media.video.src}`
                        }
                        kind="video"
                        src={
                          media.video.src
                        }
                        alt={
                          media.video.alt[
                            locale
                          ]
                        }
                        fallbackFocus={
                          media.video.focus
                        }
                        hoverLabel={
                          locale === "pt"
                            ? "Passe o mouse"
                            : "Hover to play"
                        }
                      />

                    </div>


                    <div className="home-work-card__caption">

                      <div>
                        <span className="home-work-card__kind">
                          {locale ===
                          "pt"
                            ? "Movimento"
                            : "Motion"}
                        </span>

                        <strong>
                          {
                            project.title[
                              locale
                            ]
                          }
                        </strong>
                      </div>

                      <span className="home-work-card__arrow">
                        ↗
                      </span>

                    </div>

                  </a>

                </div>

              </article>
            );

          },
        )}

      </div>


      <a
        href={`/${locale}/work`}
        className="dualis-work__archive"
      >

        <span>
          {locale === "pt"
            ? "Ver todos os trabalhos"
            : "View all work"}
        </span>

        <span>
          ↗
        </span>

      </a>

    </section>
  );
}
