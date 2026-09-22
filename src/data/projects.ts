import type { Locale } from "@/i18n/site-copy";

export type MediaFocusPoint = {
  x: number;
  y: number;
};

export type ProjectMedia = {
  id: string;

  kind:
    | "image"
    | "video";

  ratio:
    | "wide"
    | "landscape"
    | "portrait"
    | "square";

  tone:
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f";

  src: string | null;

  poster?: string | null;

  focus: MediaFocusPoint;

  label: Record<Locale, string>;

  alt: Record<Locale, string>;
};

export type ProjectCredit = {
  label: Record<Locale, string>;

  value: string;
};

export type Project = {
  slug: string;
  number: string;
  year: string;

  title: Record<Locale, string>;

  category: Record<Locale, string>;

  client: string;

  location: Record<Locale, string>;

  intro: Record<Locale, string>;

  statement: Record<Locale, string>;

  descriptionOne: Record<Locale, string>;

  descriptionTwo: Record<Locale, string>;

  credits: ProjectCredit[];

  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: "15-anos",

    number: "01",

    year: "2026",

    title: {
      pt: "15 anos",
      en: "15 years",
    },

    category: {
      pt: "Filme · Comercial",
      en: "Film · Commercial",
    },

    client: "Dualis Creative",

    location: {
      pt: "Brasil",
      en: "Brazil",
    },

    intro: {
      pt:
        "Uma narrativa construída entre precisão visual, presença e movimento.",
      en:
        "A narrative built between visual precision, presence and movement.",
    },

    statement: {
      pt:
        "Entre o instante e o movimento existe uma história.",
      en:
        "Between stillness and motion there is a story.",
    },

    descriptionOne: {
      pt:
        "O projeto parte da ideia de que uma imagem não precisa explicar tudo. Luz, enquadramento e ritmo trabalham juntos para construir uma atmosfera antes mesmo da narrativa se revelar.",
      en:
        "The project begins with the idea that an image does not need to explain everything. Light, framing and rhythm work together to create an atmosphere before the narrative reveals itself.",
    },

    descriptionTwo: {
      pt:
        "Fotografia e filme foram tratados como duas partes de uma mesma linguagem, preservando silêncio, textura e intenção em cada quadro.",
      en:
        "Photography and film were treated as two parts of the same language, preserving silence, texture and intention in every frame.",
    },

    credits: [
      {
        label: {
          pt: "Cliente",
          en: "Client",
        },
        value: "Dualis Creative",
      },
      {
        label: {
          pt: "Direção",
          en: "Direction",
        },
        value: "Dualis",
      },
      {
        label: {
          pt: "Fotografia",
          en: "Photography",
        },
        value: "Thony Nunes",
      },
      {
        label: {
          pt: "Filme",
          en: "Film",
        },
        value: "Laís Castro",
      },
    ],

    media: [
      {
        id: "hero",
        kind: "image",
        ratio: "wide",
        tone: "a",
        src: "/projects/15-anos/hero-web.webp",

        focus: {
          x: 50,
          y: 29,
        },

        label: {
          pt: "Imagem de abertura",
          en: "Opening image",
        },

        alt: {
          pt: "Imagem principal do 15 anos",
          en: "15 years main image",
        },
      },

      {
        id: "still-one",
        kind: "image",
        ratio: "portrait",
        tone: "b",
        src: "/projects/15-anos/IMG_4030.JPG-web.webp",

        focus: {
          x: 42,
          y: 31,
        },

        label: {
          pt: "Fotografia",
          en: "Photography",
        },

        alt: {
          pt: "Fotografia do 15 anos",
          en: "15 years photography",
        },
      },

      {
        id: "film-one",
        kind: "video",
        ratio: "portrait",
        tone: "c",
        src: "/projects/15-anos/IMG_2277.mp4",

        focus: {
          x: 50,
          y: 36,
        },
        poster: "/projects/15-anos/IMG_2277-poster.jpg",

        label: {
          pt: "Filme",
          en: "Film",
        },

        alt: {
          pt: "Filme do 15 anos",
          en: "15 years film",
        },
      },

      {
        id: "wide-one",
        kind: "image",
        ratio: "wide",
        tone: "d",
        src: "/projects/15-anos/IMG_4026.JPG-web.webp",

        focus: {
          x: 43,
          y: 40,
        },

        label: {
          pt: "Frame",
          en: "Frame",
        },

        alt: {
          pt: "Frame panorâmico do 15 anos",
          en: "15 years panoramic frame",
        },
      },

      {
        id: "detail-one",
        kind: "image",
        ratio: "square",
        tone: "e",
        src: "/projects/15-anos/IMG_4027.JPG-web.webp",

        focus: {
          x: 50,
          y: 32,
        },

        label: {
          pt: "Detalhe",
          en: "Detail",
        },

        alt: {
          pt: "Detalhe do 15 anos",
          en: "15 years detail",
        },
      },

      {
        id: "film-two",
        kind: "video",
        ratio: "landscape",
        tone: "f",
        src: "/projects/15-anos/IMG_2291.mp4",

        focus: {
          x: 50,
          y: 38,
        },
        poster: "/projects/15-anos/IMG_2291-poster.jpg",

        label: {
          pt: "Movimento",
          en: "Motion",
        },

        alt: {
          pt: "Segundo filme do 15 anos",
          en: "15 years second film",
        },
      },
    ],
  },

  {
    slug: "editorial-casamentos",

    number: "02",

    year: "2026",

    title: {
      pt: "Casamentos",
      en: "Weddings",
    },

    category: {
      pt: "Fotografia · Editorial",
      en: "Photography · Editorial",
    },

    client: "Dualis Creative",

    location: {
      pt: "Brasil",
      en: "Brazil",
    },

    intro: {
      pt:
        "Forma, silêncio e textura transformados em uma experiência editorial.",
      en:
        "Form, silence and texture transformed into an editorial experience.",
    },

    statement: {
      pt:
        "A matéria encontra o silêncio.",
      en:
        "Matter meets silence.",
    },

    descriptionOne: {
      pt:
        "A série trabalha com escala, textura e espaço negativo para construir imagens que parecem existir entre fotografia e objeto.",
      en:
        "The series works with scale, texture and negative space to create images that seem to exist somewhere between photography and object.",
    },

    descriptionTwo: {
      pt:
        "O movimento entra como extensão da fotografia: lento, preciso e atento aos pequenos acontecimentos dentro do quadro.",
      en:
        "Motion becomes an extension of photography: slow, precise and attentive to the smallest events inside the frame.",
    },

    credits: [
      {
        label: {
          pt: "Cliente",
          en: "Client",
        },
        value: "Dualis Creative",
      },
      {
        label: {
          pt: "Conceito",
          en: "Concept",
        },
        value: "Dualis",
      },
      {
        label: {
          pt: "Fotografia",
          en: "Photography",
        },
        value: "Thony Nunes",
      },
      {
        label: {
          pt: "Direção de arte",
          en: "Art direction",
        },
        value: "Dualis",
      },
      {
        label: {
          pt: "Filme",
          en: "Film",
        },
        value: "Laís Castro",
      },
    ],

    media: [
      {
        id: "hero",
        kind: "image",
        ratio: "wide",
        tone: "d",
        src: "/projects/editorial-casamentos/IMG_5960.JPG-web.webp",

        focus: {
          x: 41,
          y: 28,
        },

        label: {
          pt: "Imagem de abertura",
          en: "Opening image",
        },

        alt: {
          pt: "Imagem principal do Casamentos",
          en: "Weddings main image",
        },
      },

      {
        id: "still-one",
        kind: "image",
        ratio: "portrait",
        tone: "a",
        src: "/projects/editorial-casamentos/IMG_5959.JPG-web.webp",

        focus: {
          x: 44,
          y: 40,
        },

        label: {
          pt: "Fotografia",
          en: "Photography",
        },

        alt: {
          pt: "Fotografia do Casamentos",
          en: "Weddings photography",
        },
      },

      {
        id: "film-one",
        kind: "video",
        ratio: "portrait",
        tone: "e",
        src: "/projects/editorial-casamentos/IMG_2291.mp4",

        poster: "/projects/editorial-casamentos/IMG_2291-poster.jpg",

        focus: {
          x: 50,
          y: 34,
        },

        label: {
          pt: "Filme",
          en: "Film",
        },

        alt: {
          pt: "Filme do Casamentos",
          en: "Weddings film",
        },
      },

      {
        id: "wide-one",
        kind: "image",
        ratio: "wide",
        tone: "b",
        src: "/projects/editorial-casamentos/IMG_5955.JPG-web.webp",

        focus: {
          x: 50,
          y: 28,
        },

        label: {
          pt: "Frame",
          en: "Frame",
        },

        alt: {
          pt: "Frame panorâmico do Casamentos",
          en: "Weddings panoramic frame",
        },
      },

      {
        id: "detail-one",
        kind: "image",
        ratio: "square",
        tone: "f",
        src: "/projects/editorial-casamentos/IMG_2854.JPG-web.webp",

        focus: {
          x: 41,
          y: 30,
        },

        label: {
          pt: "Detalhe",
          en: "Detail",
        },

        alt: {
          pt: "Detalhe do Casamentos",
          en: "Weddings detail",
        },
      },

      {
        id: "film-two",
        kind: "video",
        ratio: "landscape",
        tone: "c",
        src: null,

        focus: {
          x: 50,
          y: 36,
        },

        label: {
          pt: "Movimento",
          en: "Motion",
        },

        alt: {
          pt: "Segundo filme do Casamentos",
          en: "Weddings second film",
        },
      },
    ],
  },

  {
    slug: "fotos-institucionais",

    number: "03",

    year: "2026",

    title: {
      pt: "Fotos Institucionais",
      en: "Corporate Photography",
    },

    category: {
      pt: "Filme · Campanha",
      en: "Film · Campaign",
    },

    client: "Dualis Creative",

    location: {
      pt: "Brasil",
      en: "Brazil",
    },

    intro: {
      pt:
        "Luz, ritmo e presença articulados em torno de uma campanha visual.",
      en:
        "Light, rhythm and presence articulated around a visual campaign.",
    },

    statement: {
      pt:
        "Ritmo, luz e presença.",
      en:
        "Rhythm, light and presence.",
    },

    descriptionOne: {
      pt:
        "O projeto explora movimento como linguagem gráfica, criando relações entre corpo, câmera e espaço.",
      en:
        "The project explores movement as a graphic language, creating relationships between body, camera and space.",
    },

    descriptionTwo: {
      pt:
        "Os frames estáticos preservam a força da campanha enquanto o filme expande sua atmosfera através do tempo.",
      en:
        "The still frames preserve the strength of the campaign while film expands its atmosphere through time.",
    },

    credits: [
      {
        label: {
          pt: "Cliente",
          en: "Client",
        },
        value: "Dualis Creative",
      },
      {
        label: {
          pt: "Direção",
          en: "Direction",
        },
        value: "Dualis",
      },
      {
        label: {
          pt: "Fotografia",
          en: "Photography",
        },
        value: "Thony Nunes",
      },
      {
        label: {
          pt: "Filme",
          en: "Film",
        },
        value: "Laís Castro",
      },
      {
        label: {
          pt: "Pós-produção",
          en: "Post-production",
        },
        value: "Thony Nunes · Laís Castro",
      },
    ],

    media: [
      {
        id: "hero",
        kind: "image",
        ratio: "wide",
        tone: "f",
        src: "/projects/fotos-institucionais/IMG_2351-web.webp",

        focus: {
          x: 44,
          y: 40,
        },

        label: {
          pt: "Imagem de abertura",
          en: "Opening image",
        },

        alt: {
          pt: "Imagem principal do Fotos Institucionais",
          en: "Corporate Photography main image",
        },
      },

      {
        id: "still-one",
        kind: "image",
        ratio: "portrait",
        tone: "c",
        src: "/projects/fotos-institucionais/IMG_2352-web.webp",

        focus: {
          x: 50,
          y: 30,
        },

        label: {
          pt: "Fotografia",
          en: "Photography",
        },

        alt: {
          pt: "Fotografia do Fotos Institucionais",
          en: "Corporate Photography photography",
        },
      },

      {
        id: "film-one",
        kind: "video",
        ratio: "portrait",
        tone: "a",
        src: "/projects/fotos-institucionais/IMG_0600.web.mp4",

        poster: "/projects/fotos-institucionais/IMG_0600-poster.jpg",

        focus: {
          x: 50,
          y: 38,
        },

        label: {
          pt: "Filme",
          en: "Film",
        },

        alt: {
          pt: "Filme do Fotos Institucionais",
          en: "Corporate Photography film",
        },
      },

      {
        id: "wide-one",
        kind: "image",
        ratio: "wide",
        tone: "e",
        src: "/projects/fotos-institucionais/IMG_2682-web.webp",

        focus: {
          x: 41,
          y: 28,
        },

        label: {
          pt: "Frame",
          en: "Frame",
        },

        alt: {
          pt: "Frame panorâmico do Fotos Institucionais",
          en: "Corporate Photography panoramic frame",
        },
      },

      {
        id: "detail-one",
        kind: "image",
        ratio: "square",
        tone: "b",
        src: "/projects/fotos-institucionais/IMG_2350-web.webp",

        focus: {
          x: 44,
          y: 40,
        },

        label: {
          pt: "Detalhe",
          en: "Detail",
        },

        alt: {
          pt: "Detalhe do Fotos Institucionais",
          en: "Corporate Photography detail",
        },
      },

      {
        id: "film-two",
        kind: "video",
        ratio: "landscape",
        tone: "d",
        src: null,

        focus: {
          x: 50,
          y: 34,
        },

        label: {
          pt: "Movimento",
          en: "Motion",
        },

        alt: {
          pt: "Segundo filme do Fotos Institucionais",
          en: "Corporate Photography second film",
        },
      },
    ],
  },

  {
    slug: "eventos-externos-palestras",

    number: "04",

    year: "2026",

    title: {
      pt: "Eventos externos e palestras",
      en: "Outdoor Events and Talks",
    },

    category: {
      pt: "Eventos · Palestras",
      en: "Events · Talks",
    },

    client:
      "Projetos diversos",

    location: {
      pt: "Brasil",
      en: "Brazil",
    },

    intro: {
      pt:
        "Entre palco, público e bastidores, acompanhamos encontros ao vivo para transformar presença, gesto e atmosfera em memória visual.",
      en:
        "Between the stage, the audience and behind the scenes, we follow live encounters to transform presence, gesture and atmosphere into visual memory.",
    },

    statement: {
      pt:
        "O instante acontece uma vez. A imagem faz com que ele continue.",
      en:
        "The moment happens once. The image allows it to continue.",
    },

    descriptionOne: {
      pt:
        "Eventos externos e palestras exigem um olhar atento ao imprevisível: mudanças de luz, deslocamentos, reações do público e pequenos gestos que não se repetem. A cobertura da Dualis parte dessa dinâmica, combinando leitura documental e intenção estética para registrar o evento sem interromper o seu fluxo.",
      en:
        "Outdoor events and talks demand close attention to the unpredictable: changing light, movement, audience reactions and small gestures that happen only once. Dualis approaches this dynamic by combining documentary observation with visual intention, recording the event without interrupting its natural flow.",
    },

    descriptionTwo: {
      pt:
        "Fotografia e filme trabalham como partes da mesma narrativa. Alternamos planos gerais, detalhes, bastidores e momentos de interação para construir um conjunto de imagens que preserva a atmosfera do encontro e também se desdobra em materiais de comunicação, memória e conteúdo.",
      en:
        "Photography and film work as parts of the same narrative. We alternate wide views, details, behind-the-scenes moments and interactions to build a visual body of work that preserves the atmosphere of the event while also becoming material for communication, memory and content.",
    },

    credits: [
      {
        label: {
          pt: "Direção visual",
          en: "Visual direction",
        },
        value: "Dualis Creative",
      },
      {
        label: {
          pt: "Fotografia",
          en: "Photography",
        },
        value: "Thony Nunes",
      },
      {
        label: {
          pt: "Filme",
          en: "Film",
        },
        value: "Laís Castro",
      },
      {
        label: {
          pt: "Edição e pós-produção",
          en: "Editing & post-production",
        },
        value: "Thony Nunes · Laís Castro",
      },
    ],
    media: [
      {
        id: "hero",
        kind: "image",
        ratio: "wide",
        tone: "a",
        src: "/projects/eventos-externos-palestras/IMG_0463.JPG-web.webp",

        focus: {
          x: 50,
          y: 38,
        },

        label: {
          pt: "Imagem de abertura",
          en: "Opening image",
        },

        alt: {
          pt: "Imagem principal de Eventos externos e palestras",
          en: "Outdoor Events and Talks main image",
        },
      },

      {
        id: "still-one",
        kind: "image",
        ratio: "portrait",
        tone: "b",
        src: "/projects/eventos-externos-palestras/IMG_0508.JPG-web.webp",

        focus: {
          x: 50,
          y: 38,
        },

        label: {
          pt: "Fotografia",
          en: "Photography",
        },

        alt: {
          pt: "Fotografia de Eventos externos e palestras",
          en: "Outdoor Events and Talks photography",
        },
      },

      {
        id: "film-one",
        kind: "video",
        ratio: "portrait",
        tone: "c",
        src: "/projects/eventos-externos-palestras/IMG_0582.mp4",
        poster: "/projects/eventos-externos-palestras/IMG_0582-poster.jpg",

        focus: {
          x: 50,
          y: 38,
        },

        label: {
          pt: "Filme",
          en: "Film",
        },

        alt: {
          pt: "Filme de Eventos externos e palestras",
          en: "Outdoor Events and Talks film",
        },
      },

      {
        id: "wide-one",
        kind: "image",
        ratio: "wide",
        tone: "d",
        src: "/projects/eventos-externos-palestras/IMG_0475.JPG-web.webp",

        focus: {
          x: 50,
          y: 38,
        },

        label: {
          pt: "Frame",
          en: "Frame",
        },

        alt: {
          pt: "Frame panorâmico de Eventos externos e palestras",
          en: "Outdoor Events and Talks panoramic frame",
        },
      },

      {
        id: "detail-one",
        kind: "image",
        ratio: "square",
        tone: "e",
        src: "/projects/eventos-externos-palestras/IMG_0499.JPG-web.webp",

        focus: {
          x: 50,
          y: 38,
        },

        label: {
          pt: "Detalhe",
          en: "Detail",
        },

        alt: {
          pt: "Detalhe de Eventos externos e palestras",
          en: "Outdoor Events and Talks detail",
        },
      },

      {
        id: "film-two",
        kind: "video",
        ratio: "landscape",
        tone: "f",
        src: "/projects/eventos-externos-palestras/IMG_0615.mp4",
        poster: "/projects/eventos-externos-palestras/IMG_0615-poster.jpg",

        focus: {
          x: 50,
          y: 38,
        },

        label: {
          pt: "Movimento",
          en: "Motion",
        },

        alt: {
          pt: "Segundo filme de Eventos externos e palestras",
          en: "Outdoor Events and Talks second film",
        },
      },
    ],
  },
];

export function getProjectBySlug(
  slug: string,
) {
  return projects.find(
    (project) =>
      project.slug === slug,
  );
}

export function getNextProject(
  slug: string,
) {
  const currentIndex =
    projects.findIndex(
      (project) =>
        project.slug === slug,
    );

  if (currentIndex === -1) {
    return projects[0];
  }

  return projects[
    (currentIndex + 1) %
      projects.length
  ];
}
