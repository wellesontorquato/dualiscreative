import {
  siteCopy,
  type Locale,
} from "@/i18n/site-copy";

type AboutPreviewProps = {
  locale: Locale;
};

export function AboutPreview({
  locale,
}: AboutPreviewProps) {
  const copy = siteCopy[locale];

  return (
    <section
      className="dualis-about"
      data-header-theme="dark"
    >
      <header className="dualis-about__head">
        <div>
          <span>02</span>
          <span>
            {copy.about.eyebrow}
          </span>
        </div>

        <p>
          {copy.about.body}
        </p>
      </header>

      <div className="dualis-about__statement">
        <span>
          {copy.about.line1}
        </span>

        <em>
          {copy.about.line2}
        </em>
      </div>

      <div className="dualis-about__duality">
        <article>
          <span>01</span>

          <h3>
            {copy.about.perspective1}
          </h3>

          <p>
            {locale === "pt"
              ? "O instante, a composição e a sensibilidade de cada quadro."
              : "The moment, composition and sensitivity of every frame."}
          </p>
        </article>

        <div className="dualis-about__plus">
          +
        </div>

        <article>
          <span>02</span>

          <h3>
            {copy.about.perspective2}
          </h3>

          <p>
            {locale === "pt"
              ? "O tempo, o ritmo e a construção de uma experiência em movimento."
              : "Time, rhythm and the construction of a moving experience."}
          </p>
        </article>
      </div>

      <div className="dualis-about__result">
        <span>
          =
        </span>

        <p>
          {locale === "pt"
            ? "Uma história contada por duas perspectivas."
            : "One story told through two perspectives."}
        </p>
      </div>

      <a
        href={`/${locale}/about`}
        className="dualis-about__link"
      >
        <span>
          {locale === "pt"
            ? "Conheça a Dualis"
            : "Discover Dualis"}
        </span>

        <span>↗</span>
      </a>
    </section>
  );
}
