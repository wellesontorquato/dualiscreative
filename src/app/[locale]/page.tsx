import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { IntroLoader } from "@/components/animations/IntroLoader";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";
import {
  HomeHeroMobileSources,
} from "@/components/home/HomeHeroMobileSources";

import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
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
}: PageProps): Promise<Metadata> {
  const { locale } =
    await params;

  if (
    !isLocale(locale)
  ) {
    return {};
  }

  const copy =
    siteCopy[locale];

  return {
    title:
      copy.meta.title,

    description:
      copy.meta.description,

    alternates: {
      canonical:
        `/${locale}`,

      languages: {
        "pt-BR":
          "/pt",

        en:
          "/en",

        "x-default":
          "/pt",
      },
    },
  };
}


export default async function HomePage({
  params,
}: PageProps) {
  const { locale } =
    await params;

  if (
    !isLocale(locale)
  ) {
    notFound();
  }

  return (
    <>
      <IntroLoader locale={locale} />

      <CustomCursor />

      <main id="main-content" tabIndex={-1} className="home-page-shell">

        <HomeHeroMobileSources />
        <Hero locale={locale} />

        <SelectedWork locale={locale} />

        <AboutPreview locale={locale} />

        <ContactSection locale={locale} />
      </main>
    </>
  );
}
