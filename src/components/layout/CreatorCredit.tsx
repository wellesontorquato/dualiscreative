import type {
  Locale,
} from "@/i18n/site-copy";


type CreatorCreditProps = {
  locale: Locale;
};


export function CreatorCredit({
  locale,
}: CreatorCreditProps) {

  const label =
    locale === "pt"
      ? "CRIADO POR WELLESON TORQUATO"
      : "CREATED BY WELLESON TORQUATO";


  return (
    <a
      className="dualis-creator-credit"
      href="https://www.instagram.com/wtor4/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        locale === "pt"
          ? "Instagram de Welleson Torquato"
          : "Welleson Torquato on Instagram"
      }
    >
      {label}
    </a>
  );
}
