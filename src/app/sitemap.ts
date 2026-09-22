import type {
  MetadataRoute,
} from "next";

import {
  projects,
} from "@/data/projects";

import {
  absoluteUrl,
} from "@/lib/site-url";


const locales =
  [
    "pt",
    "en",
  ] as const;


const staticRoutes =
  [
    "",
    "/work",
    "/about",
    "/contact",
  ] as const;


export default function sitemap():
  MetadataRoute.Sitemap {

  const entries:
    MetadataRoute.Sitemap =
      [];


  for (
    const locale
    of locales
  ) {

    for (
      const route
      of staticRoutes
    ) {

      entries.push({
        url:
          absoluteUrl(
            `/${locale}${route}`,
          ),

        changeFrequency:
          route === ""
            ? "weekly"
            : "monthly",

        priority:
          route === ""
            ? 1
            : route === "/work"
              ? 0.9
              : 0.7,
      });

    }


    for (
      const project
      of projects
    ) {

      entries.push({
        url:
          absoluteUrl(
            `/${locale}/work/${project.slug}`,
          ),

        changeFrequency:
          "monthly",

        priority:
          0.8,
      });

    }

  }


  return entries;
}
