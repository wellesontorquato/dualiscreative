import type {
  Metadata,
} from "next";


export type SeoLocale =
  | "pt"
  | "en";


export type SeoRoute =
  | "home"
  | "work"
  | "about"
  | "contact";


type RouteSeo = {
  title: string;
  description: string;
  path: string;
};


const routeSeo:
  Record<
    SeoLocale,
    Record<
      SeoRoute,
      RouteSeo
    >
  > = {

  pt: {

    home: {
      title:
        "EstÃºdio audiovisual de fotografia e movimento",

      description:
        "Dualis Creative Ã© um estÃºdio audiovisual dedicado a fotografia, filme e narrativas visuais com direÃ§Ã£o editorial.",

      path:
        "",
    },


    work: {
      title:
        "Trabalhos",

      description:
        "Explore projetos de fotografia e movimento desenvolvidos pela Dualis Creative.",

      path:
        "/work",
    },


    about: {
      title:
        "Sobre",

      description:
        "ConheÃ§a a Dualis Creative, sua abordagem visual e a uniÃ£o entre fotografia e movimento.",

      path:
        "/about",
    },


    contact: {
      title:
        "Contato",

      description:
        "Entre em contato com a Dualis Creative para projetos de fotografia, filme e produÃ§Ã£o audiovisual.",

      path:
        "/contact",
    },

  },


  en: {

    home: {
      title:
        "Photography and motion studio",

      description:
        "Dualis Creative is an audiovisual studio focused on photography, film and editorial visual storytelling.",

      path:
        "",
    },


    work: {
      title:
        "Work",

      description:
        "Explore photography and motion projects created by Dualis Creative.",

      path:
        "/work",
    },


    about: {
      title:
        "About",

      description:
        "Discover Dualis Creative, its visual approach and the meeting point between photography and motion.",

      path:
        "/about",
    },


    contact: {
      title:
        "Contact",

      description:
        "Contact Dualis Creative for photography, film and audiovisual production projects.",

      path:
        "/contact",
    },

  },

};


export function buildRouteMetadata(
  locale:
    SeoLocale,

  route:
    SeoRoute,
): Metadata {

  const metadata =
    routeSeo[
      locale
    ][
      route
    ];


  const currentPath =
    `/${locale}${metadata.path}`;


  const portuguesePath =
    `/pt${metadata.path}`;


  const englishPath =
    `/en${metadata.path}`;


  const socialTitle =
    `${metadata.title} â€” Dualis Creative`;


  return {
    title:
      metadata.title,

    description:
      metadata.description,


    alternates: {
      canonical:
        currentPath,

      languages: {
        "pt-BR":
          portuguesePath,

        en:
          englishPath,

        "x-default":
          portuguesePath,
      },
    },


    openGraph: {
      type:
        "website",

      siteName:
        "Dualis Creative",

      title:
        socialTitle,

      description:
        metadata.description,

      url:
        currentPath,

      locale:
        locale === "pt"
          ? "pt_BR"
          : "en_US",

      alternateLocale:
        locale === "pt"
          ? [
              "en_US",
            ]
          : [
              "pt_BR",
            ],

      images: [
        {
          url:
            "/opengraph-image",

          width:
            1200,

          height:
            630,

          alt:
            "Dualis Creative",
        },
      ],
    },


    twitter: {
      card:
        "summary_large_image",

      title:
        socialTitle,

      description:
        metadata.description,

      images: [
        "/opengraph-image",
      ],
    },
  };
}
