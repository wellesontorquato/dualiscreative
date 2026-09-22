"use client";

import { usePathname, useRouter } from "next/navigation";

import type { Locale } from "@/i18n/site-copy";

type LanguageSwitcherProps = {
  locale: Locale;
};

export function LanguageSwitcher({
  locale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (target: Locale) => {
    if (target === locale) return;

    const hash =
      typeof window !== "undefined"
        ? window.location.hash
        : "";

    const hasLocale =
      /^\/(pt|en)(\/|$)/.test(pathname);

    const nextPath = hasLocale
      ? pathname.replace(
          /^\/(pt|en)(?=\/|$)/,
          `/${target}`,
        )
      : `/${target}`;

    router.push(`${nextPath}${hash}`);
  };

  return (
    <div
      className="language-switcher"
      aria-label="Language"
    >
      <button
        type="button"
        className={
          locale === "pt"
            ? "language-switcher__button is-active"
            : "language-switcher__button"
        }
        onClick={() => changeLanguage("pt")}
      >
        PT
      </button>

      <span className="language-switcher__divider">
        /
      </span>

      <button
        type="button"
        className={
          locale === "en"
            ? "language-switcher__button is-active"
            : "language-switcher__button"
        }
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}
