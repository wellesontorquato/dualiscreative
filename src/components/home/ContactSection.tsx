import { CreatorCredit } from "@/components/layout/CreatorCredit";

import {
  siteCopy,
  type Locale,
} from "@/i18n/site-copy";

type ContactSectionProps = {
  locale: Locale;
};

export function ContactSection({
  locale,
}: ContactSectionProps) {
  const copy = siteCopy[locale];

  return (
    <footer
      className="dualis-contact"
      data-header-theme="light"
    >
      <div className="dualis-contact__index">
        <span>03</span>
        <span>
          {copy.contact.pageEyebrow}
        </span>
      </div>

      <div className="dualis-contact__statement">
        <p>
          {copy.contact.eyebrow}
        </p>

        <a
          href={`/${locale}/contact`}
        >
          <span>
            {copy.contact.cta}
          </span>

          <span>↗</span>
        </a>
      </div>

      <a
        href="mailto:contato@dualiscreative.com.br"
        className="dualis-contact__email"
      >
        contato@dualiscreative.com
      </a>

      <div className="dualis-contact__footer">
        <span>
          DUALIS CREATIVE
        </span>

        <div>
          <a href="https://www.instagram.com/dualiscreative/" target="_blank" rel="noreferrer noopener">
            Instagram
          </a>

          <a href={`/${locale}/work`}>
            Work
          </a>

          <a href={`/${locale}/about`}>
            About
          </a>
        </div>

        <span>
  <span>© 2026</span>
  <span className="dualis-creator-separator" aria-hidden="true">·</span>
  <CreatorCredit locale={locale} />
</span>
      </div>
    </footer>
  );
}
