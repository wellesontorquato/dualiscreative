export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const siteCopy = {
  pt: {
    meta: {
      title: "Dualis Creative — Estúdio de criação visual",
      description:
        "Fotografia, filme e direção visual. Duas visões. Uma história.",
    },

    header: {
      availability: "Disponível para projetos",
    },

    nav: {
      navigation: "Navegação",
      work: "Work",
      about: "About",
      contact: "Contact",
    },

    hero: {
      studio: "Estúdio de criação visual",
      disciplines: "Fotografia · Filme",
      line1: "Duas visões.",
      line2: "Uma história.",
      descriptor1: "Histórias visuais através de",
      descriptor2: "imagem & movimento",
      scroll: "Explorar",
      country: "Brasil",
    },

    work: {
      eyebrow: "Trabalhos selecionados",
      intro:
        "Imagem, movimento e narrativa como uma única linguagem.",
      pageEyebrow: "Arquivo visual",
      pageTitle1: "Trabalhos",
      pageTitle2: "selecionados.",
      pageIntro:
        "Uma seleção de filmes, fotografias e histórias construídas através de dois olhares.",
      viewProject: "Ver projeto",
    },

    about: {
      eyebrow: "Sobre a Dualis",
      line1: "Dois olhares.",
      line2: "Uma mesma direção.",
      body:
        "A Dualis nasce do encontro entre perspectivas diferentes que se completam. Fotografia e movimento convivem como partes de uma mesma narrativa.",
      pageEyebrow: "Manifesto",
      pageTitle1: "Duas perspectivas.",
      pageTitle2: "Uma identidade.",
      paragraph1:
        "Não enxergamos fotografia e filme como linguagens separadas. Para nós, cada imagem pertence a uma história maior.",
      paragraph2:
        "A Dualis trabalha entre o instante e o movimento, entre direção e espontaneidade, criando imagens que carregam intenção antes mesmo de carregarem uma assinatura.",
      perspective1: "Olhar",
      perspective2: "Movimento",
      perspective3: "Narrativa",
      perspective4: "Direção",
    },

    contact: {
      eyebrow: "Tem uma história para contar?",
      cta: "Vamos criar",
      pageEyebrow: "Contato",
      pageTitle1: "Toda história",
      pageTitle2: "começa com uma conversa.",
      pageIntro:
        "Projetos, campanhas, filmes, fotografia ou apenas uma ideia que ainda precisa encontrar sua forma.",
      emailLabel: "E-mail",
      socialLabel: "Social",
      locationLabel: "Base",
      location: "Brasil",
    },

    footer: {
      rights: "Dualis Creative",
    },
  },

  en: {
    meta: {
      title: "Dualis Creative — Creative Visual Studio",
      description:
        "Photography, film and visual direction. Two visions. One story.",
    },

    header: {
      availability: "Available for projects",
    },

    nav: {
      navigation: "Navigation",
      work: "Work",
      about: "About",
      contact: "Contact",
    },

    hero: {
      studio: "Creative Visual Studio",
      disciplines: "Photography · Film",
      line1: "Two visions.",
      line2: "One story.",
      descriptor1: "Visual stories through",
      descriptor2: "image & movement",
      scroll: "Explore",
      country: "Brazil",
    },

    work: {
      eyebrow: "Selected work",
      intro:
        "Image, movement and narrative as a single visual language.",
      pageEyebrow: "Visual archive",
      pageTitle1: "Selected",
      pageTitle2: "work.",
      pageIntro:
        "A selection of films, photographs and stories shaped through two different perspectives.",
      viewProject: "View project",
    },

    about: {
      eyebrow: "About Dualis",
      line1: "Two perspectives.",
      line2: "One direction.",
      body:
        "Dualis begins where different perspectives meet and complement one another. Photography and movement become parts of the same narrative.",
      pageEyebrow: "Manifesto",
      pageTitle1: "Two perspectives.",
      pageTitle2: "One identity.",
      paragraph1:
        "We do not see photography and film as separate languages. Every image belongs to a larger story.",
      paragraph2:
        "Dualis works between stillness and movement, direction and spontaneity, creating images with intention before they ever carry a signature.",
      perspective1: "Vision",
      perspective2: "Movement",
      perspective3: "Narrative",
      perspective4: "Direction",
    },

    contact: {
      eyebrow: "Have a story to tell?",
      cta: "Let's create",
      pageEyebrow: "Contact",
      pageTitle1: "Every story",
      pageTitle2: "starts with a conversation.",
      pageIntro:
        "Projects, campaigns, films, photography or simply an idea still searching for its visual form.",
      emailLabel: "E-mail",
      socialLabel: "Social",
      locationLabel: "Based in",
      location: "Brazil",
    },

    footer: {
      rights: "Dualis Creative",
    },
  },
} as const;
