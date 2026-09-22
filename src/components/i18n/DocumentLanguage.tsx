"use client";

import {
  useLayoutEffect,
} from "react";

import type {
  Locale,
} from "@/i18n/site-copy";


type DocumentLanguageProps = {
  locale: Locale;
};


export function DocumentLanguage({
  locale,
}: DocumentLanguageProps) {

  useLayoutEffect(
    () => {

      document.documentElement.lang =
        locale === "en"
          ? "en"
          : "pt-BR";


      document.documentElement.dataset.locale =
        locale;

    },
    [
      locale,
    ],
  );


  return null;
}
