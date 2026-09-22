import { DocumentLanguage } from "@/components/i18n/DocumentLanguage";

import { notFound } from "next/navigation";

import { ScrollProgress } from "@/components/ui/ScrollProgress";

import {
  isLocale,
  locales,
} from "@/i18n/site-copy";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
      >
        {locale === "pt"
          ? "Pular para o conteúdo"
          : "Skip to content"}
      </a>

      <DocumentLanguage
        locale={locale}
      />

      <ScrollProgress />
      {children}
    </>
  );
}
