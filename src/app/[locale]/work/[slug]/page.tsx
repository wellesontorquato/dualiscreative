import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  CustomCursor,
} from "@/components/ui/CustomCursor";

import {
  SiteHeader,
} from "@/components/layout/SiteHeader";

import {
  ProjectExperience,
} from "@/components/work/ProjectExperience";

import {
  getNextProject,
  getProjectBySlug,
  projects,
} from "@/data/projects";

import {
  isLocale,
} from "@/i18n/site-copy";

type ProjectPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const dynamicParams =
  false;

export function generateStaticParams() {
  return projects.map(
    (project) => ({
      slug: project.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {

  const {
    locale,
    slug,
  } =
    await params;


  if (!isLocale(locale)) {
    return {};
  }


  const project =
    getProjectBySlug(
      slug,
    );


  if (!project) {
    return {};
  }


  const title =
    project.title[
      locale
    ];


  const description =
    project.intro[
      locale
    ];


  const currentPath =
    `/${locale}/work/${project.slug}`;


  const portuguesePath =
    `/pt/work/${project.slug}`;


  const englishPath =
    `/en/work/${project.slug}`;


  const socialTitle =
    `${title} â€” Dualis Creative`;


  return {
    title,

    description,


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

      description,

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
            socialTitle,
        },
      ],
    },


    twitter: {
      card:
        "summary_large_image",

      title:
        socialTitle,

      description,

      images: [
        "/opengraph-image",
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const {
    locale,
    slug,
  } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const project =
    getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject =
    getNextProject(slug);

  return (
    <>
      <CustomCursor />

      <SiteHeader
        locale={locale}
        tone="auto"
      />

<ProjectExperience
        locale={locale}
        project={project}
        nextProject={nextProject}
      />
    </>
  );
}
