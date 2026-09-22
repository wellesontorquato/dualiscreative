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

    "about",
  );
}

export default async function AboutPage({
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
          heroLabel: "Manifesto",

          heroLine1:
            "Duas perspectivas.",
          heroLine2:
            "Uma identidade.",

          intro:
            "A Dualis nasce do encontro entre duas formas de perceber a mesma história.",

          visionTitle:
            "Olhar",

          visionText:
            "O instante. A composição. A luz. A sensibilidade de perceber aquilo que existe por apenas uma fração de segundo.",

          motionTitle:
            "Movimento",

          motionText:
            "O tempo. O ritmo. A continuidade. A capacidade de transformar uma sucessão de imagens em experiência.",

          result:
            "Não são duas linguagens competindo por espaço. É uma única narrativa construída por dois olhares.",

          manifestoLabel:
            "O que acreditamos",

          manifestoTitle1:
            "Imagem com",
          manifestoTitle2:
            "intenção.",

          paragraph1:
            "Não enxergamos fotografia e filme como etapas separadas. Cada enquadramento, cada movimento e cada silêncio pertencem à mesma construção visual.",

          paragraph2:
            "Direção, espontaneidade e sensibilidade coexistem. O objetivo não é simplesmente registrar algo bonito — é criar imagens que continuem dizendo alguma coisa depois que o momento termina.",

          word1: "Olhar",
          word2: "Ritmo",
          word3: "Narrativa",
          word4: "Direção",

          finalLabel:
            "Dualis Creative",

          finalTitle:
            "Duas visões.",
          finalEm:
            "Uma história.",

          finalLink:
            "Começar um projeto",
        }
      : {
          heroLabel: "Manifesto",

          heroLine1:
            "Two perspectives.",
          heroLine2:
            "One identity.",

          intro:
            "Dualis begins where two different ways of seeing meet around the same story.",

          visionTitle:
            "Vision",

          visionText:
            "The moment. Composition. Light. The sensitivity to notice what exists for only a fraction of a second.",

          motionTitle:
            "Movement",

          motionText:
            "Time. Rhythm. Continuity. The ability to transform a sequence of images into an experience.",

          result:
            "They are not two languages competing for space. They are one narrative shaped through two perspectives.",

          manifestoLabel:
            "What we believe",

          manifestoTitle1:
            "Images with",
          manifestoTitle2:
            "intention.",

          paragraph1:
            "We do not see photography and film as separate stages. Every frame, movement and silence belongs to the same visual construction.",

          paragraph2:
            "Direction, spontaneity and sensitivity coexist. The goal is not simply to record something beautiful — it is to create images that continue saying something after the moment has ended.",

          word1: "Vision",
          word2: "Rhythm",
          word3: "Narrative",
          word4: "Direction",

          finalLabel:
            "Dualis Creative",

          finalTitle:
            "Two visions.",
          finalEm:
            "One story.",

          finalLink:
            "Start a project",
        };

  return (
    <>
      <CustomCursor />

      <SiteHeader
        locale={locale}
        tone="auto"
      />

      <main id="main-content" tabIndex={-1} className="about-v5">
        <section
          className="about-v5__hero"
          data-header-theme="light"
        >
          <div className="about-v5__hero-index">
            <span>02</span>
            <span>
              {localCopy.heroLabel}
            </span>
          </div>

          <div className="about-v5__hero-main">
            <h1>
              <span>
                {localCopy.heroLine1}
              </span>

              <em>
                {localCopy.heroLine2}
              </em>
            </h1>

            <p>
              {localCopy.intro}
            </p>
          </div>

          <div className="about-v5__hero-mark">
            <span>DUALIS</span>
            <span>02 / 03</span>
          </div>
        </section>

        <section
          className="about-v5__duality"
          data-header-theme="dark"
        >
          <div className="about-v5__duality-head">
            <span>
              DUALIS / CONCEPT
            </span>

            <span>
              {copy.hero.disciplines}
            </span>
          </div>

          <div className="about-v5__equation">
            <article>
              <div>
                <span>01</span>
                <span>STILL</span>
              </div>

              <h2>
                {localCopy.visionTitle}
              </h2>

              <p>
                {localCopy.visionText}
              </p>
            </article>

            <div className="about-v5__symbol">
              +
            </div>

            <article>
              <div>
                <span>02</span>
                <span>MOTION</span>
              </div>

              <h2>
                <em>
                  {localCopy.motionTitle}
                </em>
              </h2>

              <p>
                {localCopy.motionText}
              </p>
            </article>
          </div>

          <div className="about-v5__result">
            <span>=</span>

            <p>
              {localCopy.result}
            </p>
          </div>
        </section>

        <section
          className="about-v5__manifesto"
          data-header-theme="light"
        >
          <header>
            <div>
              <span>03</span>
              <span>
                {localCopy.manifestoLabel}
              </span>
            </div>

            <h2>
              <span>
                {localCopy.manifestoTitle1}
              </span>

              <em>
                {localCopy.manifestoTitle2}
              </em>
            </h2>
          </header>

          <div className="about-v5__manifesto-copy">
            <span>DUALIS / 2026</span>

            <p>
              {localCopy.paragraph1}
            </p>

            <p>
              {localCopy.paragraph2}
            </p>
          </div>

          <div className="about-v5__words">
            <span>
              {localCopy.word1}
            </span>

            <span>
              {localCopy.word2}
            </span>

            <span>
              {localCopy.word3}
            </span>

            <span>
              {localCopy.word4}
            </span>
          </div>
        </section>

        <section
          className="about-v5__closing"
          data-header-theme="dark"
        >
          <span>
            {localCopy.finalLabel}
          </span>

          <div>
            <h2>
              {localCopy.finalTitle}
              <em>
                {localCopy.finalEm}
              </em>
            </h2>

            <a
              href={`/${locale}/contact`}
            >
              <span>
                {localCopy.finalLink}
              </span>

              <span>↗</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
