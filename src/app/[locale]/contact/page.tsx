import { CreatorCredit } from "@/components/layout/CreatorCredit";

import { buildRouteMetadata } from "@/lib/route-metadata";

import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { CustomCursor } from "@/components/ui/CustomCursor";

import {
  isLocale,
  siteCopy,
} from "@/i18n/site-copy";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {

  const {
    locale,
  } =
    await params;


  return buildRouteMetadata(
    locale === "en"
      ? "en"
      : "pt",

    "contact",
  );
}

export default async function ContactPage({
  params,
}: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale];

  const localCopy =
    locale === "pt"
      ? {
          eyebrow: "Contato",

          title1:
            "Toda história",
          title2:
            "começa com uma conversa.",

          lead:
            "Se existe uma ideia, um projeto ou apenas uma sensação que ainda precisa encontrar sua forma visual, queremos ouvir.",

          start:
            "Começar um projeto",

          availability:
            "Disponível para novos projetos",

          disciplines:
            "Fotografia · Filme · Direção",

          mailLabel:
            "E-mail",

          social:
            "Social",

          location:
            "Base",

          locationValue:
            "Brasil",

          languages:
            "Idiomas",

          languagesValue:
            "Português · English",

          focus:
            "Atuação",

          focusValue:
            "Imagem · Movimento · Narrativa",

          closing1:
            "Uma boa imagem",
          closing2:
            "começa antes da câmera.",

          back:
            "Ver trabalhos",
        }
      : {
          eyebrow: "Contact",

          title1:
            "Every story",
          title2:
            "starts with a conversation.",

          lead:
            "If there is an idea, a project or simply a feeling still searching for its visual form, we want to hear it.",

          start:
            "Start a project",

          availability:
            "Available for new projects",

          disciplines:
            "Photography · Film · Direction",

          mailLabel:
            "E-mail",

          social:
            "Social",

          location:
            "Based in",

          locationValue:
            "Brazil",

          languages:
            "Languages",

          languagesValue:
            "Português · English",

          focus:
            "Focus",

          focusValue:
            "Image · Movement · Narrative",

          closing1:
            "A good image",
          closing2:
            "begins before the camera.",

          back:
            "View work",
        };

  return (
    <>
      <CustomCursor />

      <SiteHeader
        locale={locale}
        tone="auto"
      />

      <main id="main-content" tabIndex={-1} className="contact-v5">
        <section
          className="contact-v5__hero"
          data-header-theme="light"
        >
          <div className="contact-v5__index">
            <span>03</span>

            <span>
              {localCopy.eyebrow}
            </span>
          </div>

          <div className="contact-v5__hero-main">
            <h1>
              <span>
                {localCopy.title1}
              </span>

              <em>
                {localCopy.title2}
              </em>
            </h1>

            <p>
              {localCopy.lead}
            </p>
          </div>

          <span className="contact-v5__edition">
            DUALIS / 03
          </span>
        </section>

        <section
          className="contact-v5__connect"
          data-header-theme="dark"
        >
          <header>
            <div>
              <span className="contact-v5__status-dot" />

              <span>
                {localCopy.availability}
              </span>
            </div>

            <span>
              {localCopy.disciplines}
            </span>
          </header>

          <div className="contact-v5__mail-label">
            <span>
              {localCopy.start}
            </span>

            <span>01 — MAIL</span>
          </div>

          <a
            href="mailto:contato@dualiscreative.com.br"
            className="contact-v5__mail"
          >
            <span>
              contato@
            </span>

            <em>
              dualiscreative.com
            </em>

            <span className="contact-v5__mail-arrow">
              ↗
            </span>
          </a>

          <div className="contact-v5__details">
            <article>
              <span>
                {localCopy.social}
              </span>

              <a href="https://www.instagram.com/dualiscreative/" target="_blank" rel="noreferrer noopener">
                Instagram ↗
              </a>
            </article>

            <article>
              <span>
                {localCopy.location}
              </span>

              <p>
                {localCopy.locationValue}
              </p>
            </article>

            <article>
              <span>
                {localCopy.languages}
              </span>

              <p>
                {localCopy.languagesValue}
              </p>
            </article>

            <article>
              <span>
                {localCopy.focus}
              </span>

              <p>
                {localCopy.focusValue}
              </p>
            </article>
          </div>
        </section>

        <section
          className="contact-v5__closing"
          data-header-theme="light"
        >
          <div className="contact-v5__closing-index">
            <span>DUALIS</span>
            <span>
  <span>2026</span>
  <span className="dualis-creator-separator" aria-hidden="true">·</span>
  <CreatorCredit locale={locale} />
</span>
          </div>

          <div className="contact-v5__closing-main">
            <h2>
              <span>
                {localCopy.closing1}
              </span>

              <em>
                {localCopy.closing2}
              </em>
            </h2>

            <a
              href={`/${locale}/work`}
            >
              <span>
                {localCopy.back}
              </span>

              <span>↗</span>
            </a>
          </div>

          <div className="contact-v5__footer">
            <span>
              DUALIS CREATIVE
            </span>

            <span>
              {copy.hero.country}
            </span>

            <span>
  <span>© 2026</span>
  <span className="dualis-creator-separator" aria-hidden="true">·</span>
  <CreatorCredit locale={locale} />
</span>
          </div>
        </section>
      </main>
    </>
  );
}
