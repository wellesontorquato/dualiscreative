import type { MediaFocusPoint } from "@/data/projects";


export type HomeMediaAsset = {
  src: string;

  alt: {
    pt: string;
    en: string;
  };

  focus: MediaFocusPoint;
};


export type HomeProjectMedia = {
  photo: HomeMediaAsset;
  video: HomeMediaAsset;
};


export const homeMediaBySlug: Record<
  string,
  HomeProjectMedia
> = {
  "15-anos": {
    photo: {
      src:
        "/projects/15-anos/hero-web.webp",

      alt: {
        pt:
          "Projeto 15 anos — fotografia e movimento.",
        en:
          "15 years — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },

    video: {
      src:
        "/projects/15-anos/IMG_2277.mp4",

      alt: {
        pt:
          "Projeto 15 anos — fotografia e movimento.",
        en:
          "15 years — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },
  },

  "editorial-casamentos": {
    photo: {
      src:
        "/projects/editorial-casamentos/IMG_5960.JPG-web.webp",

      alt: {
        pt:
          "Casamentos — fotografia e movimento.",
        en:
          "Weddings — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },

    video: {
      src:
        "/projects/editorial-casamentos/IMG_2291.mp4",

      alt: {
        pt:
          "Casamentos — fotografia e movimento.",
        en:
          "Weddings — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },
  },

  "fotos-institucionais": {
    photo: {
      src:
        "/projects/fotos-institucionais/IMG_2351-web.webp",

      alt: {
        pt:
          "Fotos Institucionais — fotografia e movimento.",
        en:
          "Corporate Photography — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },

    video: {
      src:
        "/projects/fotos-institucionais/IMG_0600.web.mp4",

      alt: {
        pt:
          "Fotos Institucionais — fotografia e movimento.",
        en:
          "Corporate Photography — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },
  },

  "eventos-externos-palestras": {
    photo: {
      src:
        "/projects/eventos-externos-palestras/IMG_0463.JPG-web.webp",

      alt: {
        pt:
          "Eventos externos e palestras — fotografia e movimento.",
        en:
          "Outdoor Events and Talks — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },

    video: {
      src:
        "/projects/eventos-externos-palestras/IMG_0582.mp4",

      alt: {
        pt:
          "Eventos externos e palestras — fotografia e movimento.",
        en:
          "Outdoor Events and Talks — photography and motion.",
      },

      focus: {
        x: 50,
        y: 38,
      },
    },
  },
};
