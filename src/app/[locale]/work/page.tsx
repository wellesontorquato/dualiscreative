import { buildRouteMetadata } from "@/lib/route-metadata";

import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { CustomCursor } from "@/components/ui/CustomCursor";

import { projects } from "@/data/projects";

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

    "work",
  );
}

export default async function WorkPage({
  params,
}: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = siteCopy[locale];

  return (
    <>
      <CustomCursor />

      <SiteHeader
        locale={locale}
        tone="auto"
      />

      <main id="main-content" tabIndex={-1} className="editorial-page editorial-page--work">
        <header className="editorial-page__hero">
          <p className="editorial-page__eyebrow">
            01 — {copy.work.pageEyebrow}
          </p>

          <h1 className="editorial-page__title">
            <span>
              {copy.work.pageTitle1}
            </span>

            <em>
              {copy.work.pageTitle2}
            </em>
          </h1>

          <p className="editorial-page__lead">
            {copy.work.pageIntro}
          </p>
        </header>

        <section className="work-index">
          {projects.map((project) => (
            <a
              href={`/${locale}/work/${project.slug}`}
              className="work-index__item"
              key={project.slug}
            >
              <span className="work-index__number">
                {project.number}
              </span>

              <div className="work-index__name">
                <h2>
                  {project.title[locale]}
                </h2>

                <p>
                  {project.category[locale]}
                </p>
              </div>

              <span className="work-index__year">
                {project.year}
              </span>

              <span className="work-index__arrow">
                ↗
              </span>
            </a>
          ))}
        </section>
      </main>
    </>
  );
}
