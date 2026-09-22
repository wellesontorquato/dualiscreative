"use client";

import Image from "next/image";

import {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useSmartMedia } from "@/components/media/useSmartMedia";

import {
  ProjectMobileMediaController,
} from "@/components/work/ProjectMobileMediaController";

import type {
  Project,
  ProjectMedia,
} from "@/data/projects";

import type {
  Locale,
} from "@/i18n/site-copy";

type ProjectExperienceProps = {
  locale: Locale;

  project: Project;

  nextProject: Project;
};

const PROJECT_MEDIA_FALLBACK_FOCUS = {
  x: 50,
  y: 50,
} as const;

type ProjectMediaFrameProps = {
  media?: ProjectMedia;

  locale: Locale;

  project: Project;

  priority?: boolean;

  className?: string;

  sizes?: string;
};


function ProjectMediaFrameInner({
  media,
  locale,
  project,
  priority = false,
  className = "",
  sizes = "100vw",
}: ProjectMediaFrameProps) {

  const kind =
    media?.kind ??
    "image";

  const ratio =
    media?.ratio ??
    "wide";

  const tone =
    media?.tone ??
    "a";

  const src =
    media?.src ??
    "";

  const label =
    media?.label[locale] ??
    (
      kind === "video"
        ? locale === "pt"
          ? "Filme"
          : "Film"
        : locale === "pt"
          ? "Imagem"
          : "Image"
    );

  const alt =
    media?.alt[locale] ??
    project.title[locale];


  const {
    focus,
    isPlaying,
    mediaFailed,
    faceDetected,

    onMouseEnter,
    onMouseLeave,

    toggleVideo,

    onImageLoad,

    onVideoLoadedMetadata,
    onVideoLoadedData,
    onVideoSeeked,
    onVideoPlay,
    onVideoPause,

    onMediaError,
  } =
    useSmartMedia({
      kind,

      fallbackFocus:
        media?.focus ??
        PROJECT_MEDIA_FALLBACK_FOCUS,
    });


  const hasMedia =
    Boolean(
      media?.src,
    ) &&
    !mediaFailed;


  const frameClass =
    [
      "project-media-frame",

      `project-media-frame--${ratio}`,

      className,

      isPlaying
        ? "is-video-playing"
        : "",
    ]
      .filter(Boolean)
      .join(" ");


  const assetStyle = {
    objectPosition:
      `${focus.x}% ${focus.y}%`,
  };


  const videoControlLabel =
    locale === "pt"
      ? `${
          isPlaying
            ? "Pausar vídeo"
            : "Reproduzir vídeo"
        }: ${alt}`
      : `${
          isPlaying
            ? "Pause video"
            : "Play video"
        }: ${alt}`;


  return (
    <div
      className={frameClass}

      data-tone={tone}

      data-kind={kind}

      data-face-aware="true"

      data-project-hero={
        priority
          ? "true"
          : undefined
      }

      data-face={
        faceDetected
          ? "detected"
          : "fallback"
      }

      data-hover-video={
        kind === "video"
          ? "true"
          : undefined
      }

      data-cursor={
        kind === "video"
          ? "interactive"
          : undefined
      }

      role={
        kind === "video"
          ? "button"
          : undefined
      }

      tabIndex={
        kind === "video"
          ? 0
          : undefined
      }

      aria-pressed={
        kind === "video"
          ? isPlaying
          : undefined
      }

      aria-label={
        kind === "video"
          ? videoControlLabel
          : undefined
      }

      onMouseEnter={
        kind === "video"
          ? (
              event,
            ) => {

              void onMouseEnter(
                event.currentTarget,
              );

            }
          : undefined
      }

      onMouseLeave={
        kind === "video"
          ? (
              event,
            ) => {

              onMouseLeave(
                event.currentTarget,
              );

            }
          : undefined
      }

      onKeyDown={
        kind === "video"
          ? (
              event,
            ) => {

              if (
                event.key !== "Enter" &&
                event.key !== " "
              ) {

                return;

              }


              event.preventDefault();


              void toggleVideo(
                event.currentTarget,
              );

            }
          : undefined
      }

      /*
       * Tecnologias assistivas podem gerar
       * um click sintético com detail === 0.
       *
       * Clique/tap comum não altera o vídeo.
       */

      onClick={
        kind === "video"
          ? (
              event,
            ) => {

              if (
                event.detail !== 0
              ) {

                return;

              }


              void toggleVideo(
                event.currentTarget,
              );

            }
          : undefined
      }

      onBlur={
        kind === "video"
          ? (
              event,
            ) => {

              onMouseLeave(
                event.currentTarget,
              );

            }
          : undefined
      }
    >

      <div className="project-media-frame__inner">

        {hasMedia &&
        kind === "image" ? (

          <Image
            src={src}

            alt={alt}

            fill

            priority={priority}

            sizes={sizes}

            className="project-media-frame__asset"

            style={assetStyle}

            onLoad={(
              event,
            ) => {

              onImageLoad(
                event.currentTarget,
              );

            }}

            onError={
              () => {

                onMediaError();

              }
            }
          />

        ) : null}


        {hasMedia &&
        kind === "video" ? (

          <video
            src={src}

            className="project-media-frame__asset"

            style={assetStyle}

            data-smart-video="true"

            aria-label={alt}

            muted

            loop

            playsInline

            preload="metadata"

            poster={
              media?.poster ??
              undefined
            }

            crossOrigin="anonymous"

            disablePictureInPicture

            onLoadedMetadata={(
              event,
            ) => {

              onVideoLoadedMetadata(
                event.currentTarget,
              );

            }}

            onLoadedData={(
              event,
            ) => {

              onVideoLoadedData(
                event.currentTarget,
              );

            }}

            onSeeked={(
              event,
            ) => {

              onVideoSeeked(
                event.currentTarget,
              );

            }}

            onPlay={(
              event,
            ) => {

              onVideoPlay(
                event.currentTarget,
              );

            }}

            onPause={(
              event,
            ) => {

              onVideoPause(
                event.currentTarget,
              );

            }}

            onError={
              () => {

                onMediaError();

              }
            }
          />

        ) : null}


        {!hasMedia ? (

          <div className="project-media-frame__fallback">

            <span className="project-media-frame__fallback-number">
              {project.number}
            </span>

            <span className="project-media-frame__fallback-brand">
              DUALIS
            </span>

          </div>

        ) : null}


        <div className="project-media-frame__shade" />


        <div className="project-media-frame__meta">

          <span>
            {label}
          </span>

          <span>
            {kind === "video"
              ? "MOTION"
              : "STILL"}
          </span>

        </div>


        {kind === "video" ? (

          <div
            className="project-media-frame__play"
            aria-hidden="true"
          >

            <span>
              ▶
            </span>

          </div>

        ) : null}

      </div>

    </div>
  );
}


function ProjectMediaFrame(
  props:
    ProjectMediaFrameProps,
) {

  const resetKey =
    [
      props.project.slug,

      props.media?.id ??
        "fallback",

      props.media?.src ??
        "empty",
    ].join(":");


  return (
    <ProjectMediaFrameInner
      key={resetKey}
      {...props}
    />
  );
}

export function ProjectExperience({
  locale,
  project,
  nextProject,
}: ProjectExperienceProps) {
  const rootRef =
    useRef<HTMLElement>(null);

  const heroRef =
    useRef<HTMLElement>(null);

  const dualityRef =
    useRef<HTMLElement>(null);

  const media =
    project.media;

  const copy =
    locale === "pt"
      ? {
          project: "Projeto",

          scroll:
            "Descobrir",

          concept:
            "Conceito",

          perspectives:
            "Duas perspectivas",

          still:
            "Fotografia",

          motion:
            "Movimento",

          meets:
            "encontra",

          sequence:
            "Sequência",

          details:
            "Detalhes",

          credits:
            "Ficha técnica",

          next:
            "Próximo projeto",

          close:
            "Uma história construída entre imagem e movimento.",
        }
      : {
          project: "Project",

          scroll:
            "Discover",

          concept:
            "Concept",

          perspectives:
            "Two perspectives",

          still:
            "Photography",

          motion:
            "Motion",

          meets:
            "meets",

          sequence:
            "Sequence",

          details:
            "Details",

          credits:
            "Credits",

          next:
            "Next project",

          close:
            "One story shaped between image and movement.",
        };

  useLayoutEffect(() => {
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;


    /*
     * Sem timelines e sem ScrollTriggers
     * quando o sistema pede menos movimento.
     *
     * O conteúdo permanece no estado estático
     * normal do HTML/CSS.
     */

    if (reducedMotion) {
      return;
    }


    /*
     * DUALIS_MOBILE_PROJECT_NATURAL_FLOW_V2
     *
     * No celular o projeto segue fluxo natural.
     * Desktop preserva integralmente a timeline.
     */
    const mobileProjectExperience =
      window.matchMedia(
        "(max-width: 800px)",
      ).matches;

    if (
      mobileProjectExperience
    ) {
      return;
    }


    gsap.registerPlugin(
      ScrollTrigger,
    );

    const ctx = gsap.context(
      () => {
        const introTimeline =
          gsap.timeline({
            delay: 0.18,
          });

        introTimeline
          .fromTo(
            ".project-hero__eyebrow > span",
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
            },
          )

          .fromTo(
            ".project-hero__title-line",
            {
              yPercent: 115,
            },
            {
              yPercent: 0,
              duration: 1,
              stagger: 0.08,
              ease: "power4.out",
            },
            "-=0.3",
          )

          .fromTo(
            ".project-hero__bottom",
            {
              opacity: 0,
              y: 14,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5",
          );

        gsap.to(
          ".project-hero .project-media-frame__inner",
          {
            scale: 1.08,
            yPercent: 7,

            ease: "none",

            scrollTrigger: {
              trigger:
                heroRef.current,

              start:
                "top top",

              end:
                "bottom top",

              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".project-intro__statement",
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,

            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".project-intro__statement",

              start:
                "top 78%",

              end:
                "top 48%",

              scrub: 0.8,
            },
          },
        );

        gsap.utils
          .toArray<HTMLElement>(
            ".project-frame-reveal",
          )
          .forEach(
            (
              element,
              index,
            ) => {
              gsap.fromTo(
                element,
                {
                  y: 90,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,

                  duration: 1.1,

                  delay:
                    index *
                    0.03,

                  ease:
                    "power4.out",

                  scrollTrigger: {
                    trigger:
                      element,

                    start:
                      "top 88%",
                  },
                },
              );
            },
          );

        gsap.to(
          ".project-duality__panel--left .project-media-frame__inner",
          {
            xPercent: -4,
            scale: 1.06,

            ease: "none",

            scrollTrigger: {
              trigger:
                dualityRef.current,

              start:
                "top bottom",

              end:
                "bottom top",

              scrub: true,
            },
          },
        );

        gsap.to(
          ".project-duality__panel--right .project-media-frame__inner",
          {
            xPercent: 4,
            scale: 1.06,

            ease: "none",

            scrollTrigger: {
              trigger:
                dualityRef.current,

              start:
                "top bottom",

              end:
                "bottom top",

              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".project-duality__divider",
          {
            scaleY: 0,
          },
          {
            scaleY: 1,

            ease: "none",

            scrollTrigger: {
              trigger:
                dualityRef.current,

              start:
                "top 70%",

              end:
                "center center",

              scrub: true,
            },
          },
        );
      },
      rootRef,
    );

    return () => {
      ctx.revert();
    };
  }, [project.slug]);

  return (
    <main id="main-content" tabIndex={-1}
      ref={rootRef}
      className="project-experience"
    >

      <ProjectMobileMediaController />
      <h1 className="sr-only">
        {project.title[locale]}
      </h1>
      <section
        ref={heroRef}
        className="project-hero"
        data-header-theme="dark"
      >
        <ProjectMediaFrame
          media={media[0]}
          locale={locale}
          project={project}
          priority
          className="project-hero__media"
        />

        <div className="project-hero__overlay" />

        <div className="project-hero__eyebrow">
          <span>
            {project.number}
          </span>

          <span>
            {project.category[locale]}
          </span>

          <span>
            {project.year}
          </span>
        </div>

        <div className="project-hero__title">
          <span className="project-hero__title-mask">
            <span className="project-hero__title-line">
              {project.title[locale]}
            </span>
          </span>
        </div>

        <div className="project-hero__bottom">
          <span>
            {project.location[locale]}
          </span>

          <a href="#concept">
            <span>
              {copy.scroll}
            </span>

            <span className="project-hero__scroll-line" />
          </a>

          <span>
            {project.client}
          </span>
        </div>
      </section>

      <section
        id="concept"
        className="project-intro"
        data-header-theme="light"
      >
        <div className="project-intro__index">
          <span>
            01
          </span>

          <span>
            {copy.concept}
          </span>
        </div>

        <div className="project-intro__content">
          <h2 className="project-intro__statement">
            {project.statement[locale]}
          </h2>

          <div className="project-intro__copy">
            <p>
              {project.intro[locale]}
            </p>

            <p>
              {project.descriptionOne[locale]}
            </p>
          </div>
        </div>

        <div className="project-intro__meta">
          <div>
            <span>
              Client
            </span>

            <strong>
              {project.client}
            </strong>
          </div>

          <div>
            <span>
              Year
            </span>

            <strong>
              {project.year}
            </strong>
          </div>

          <div>
            <span>
              Location
            </span>

            <strong>
              {project.location[locale]}
            </strong>
          </div>

          <div>
            <span>
              Type
            </span>

            <strong>
              {project.category[locale]}
            </strong>
          </div>
        </div>
      </section>

      <section
        ref={dualityRef}
        className="project-duality"
        data-header-theme="dark"
      >
        <div className="project-duality__sticky">
          <header className="project-duality__head">
            <div>
              <span>
                02
              </span>

              <span>
                {copy.perspectives}
              </span>
            </div>

            <span>
              DUALIS / {project.number}
            </span>
          </header>

          <div className="project-duality__grid">
            <div className="project-duality__panel project-duality__panel--left">
              <ProjectMediaFrame
                media={media[1]}
                sizes="(max-width: 800px) 100vw, 50vw"
                locale={locale}
                project={project}
              />

              <span className="project-duality__panel-name">
                {copy.still}
              </span>
            </div>

            <div className="project-duality__divider" />

            <div className="project-duality__panel project-duality__panel--right">
              <ProjectMediaFrame
                media={media[2]}
                sizes="(max-width: 800px) 100vw, 50vw"
                locale={locale}
                project={project}
              />

              <span className="project-duality__panel-name">
                {copy.motion}
              </span>
            </div>
          </div>

          <div className="project-duality__statement" data-locale={locale}>
            <span>
              {copy.still}
            </span>

            <em>
              {copy.meets}
            </em>

            <span>
              {copy.motion}.
            </span>
          </div>
        </div>
      </section>

      <section
        className="project-sequence"
        data-header-theme="light"
      >
        <header className="project-sequence__head">
          <div>
            <span>
              03
            </span>

            <span>
              {copy.sequence}
            </span>
          </div>

          <p>
            {project.descriptionTwo[locale]}
          </p>
        </header>

        <div className="project-sequence__wide project-frame-reveal">
          <ProjectMediaFrame
            media={media[3]}
            locale={locale}
            project={project}
          />
        </div>

        <div className="project-sequence__mosaic">
          <div className="project-sequence__small project-frame-reveal">
            <ProjectMediaFrame
              media={media[4]}
              sizes="(max-width: 800px) 100vw, 36vw"
              locale={locale}
              project={project}
            />
          </div>

          <div className="project-sequence__large project-frame-reveal">
            <ProjectMediaFrame
              media={media[5]}
              sizes="(max-width: 800px) 100vw, 64vw"
              locale={locale}
              project={project}
            />
          </div>
        </div>

        <div className="project-sequence__line">
          <span>
            DUALIS
          </span>

          <span>
            {project.number}
          </span>

          <span>
            {project.year}
          </span>
        </div>
      </section>

      <section
        className="project-credits"
        data-header-theme="dark"
      >
        <div className="project-credits__index">
          <span>
            04
          </span>

          <span>
            {copy.credits}
          </span>
        </div>

        <div className="project-credits__layout">
          <div className="project-credits__list">
            {project.credits.map(
              (credit) => (
                <div
                  className="project-credits__item"
                  key={
                    credit.label.en
                  }
                >
                  <span>
                    {
                      credit.label[
                        locale
                      ]
                    }
                  </span>

                  <strong>
                    {credit.value}
                  </strong>
                </div>
              ),
            )}
          </div>

          <div className="project-credits__closing">
            <span>
              DUALIS /{" "}
              {project.number}
            </span>

            <p>
              {copy.close}
            </p>
          </div>
        </div>
      </section>

      <a
        href={`/${locale}/work/${nextProject.slug}`}
        className="project-next"
        data-header-theme="dark"
      >
        <ProjectMediaFrame
          media={
            nextProject.media[0]
          }
          locale={locale}
          project={nextProject}
          className="project-next__media"
        />

        <div className="project-next__shade" />

        <div className="project-next__top">
          <span>
            05
          </span>

          <span>
            {copy.next}
          </span>
        </div>

        <div className="project-next__title">
          <span>
            {
              nextProject.title[
                locale
              ]
            }
          </span>

          <span>
            ↗
          </span>
        </div>

        <div className="project-next__bottom">
          <span>
            {
              nextProject.category[
                locale
              ]
            }
          </span>

          <span>
            {nextProject.year}
          </span>
        </div>
      </a>
    </main>
  );
}
