import { siteUrl } from "@/lib/site-url";

import type { Metadata } from "next";

import "lenis/dist/lenis.css";

import "@fontsource-variable/bodoni-moda";

import "./globals.css";
import "./site.css";
import "./project.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  metadataBase:
    new URL(
      siteUrl,
    ),


  title: {
    default:
      "Dualis Creative",

    template:
      "%s â€” Dualis Creative",
  },


  description:
    "Fotografia, filme e direÃ§Ã£o visual. Duas visÃµes. Uma histÃ³ria.",


  applicationName:
    "Dualis Creative",


  creator:
    "Dualis Creative",


  publisher:
    "Dualis Creative",


  formatDetection: {
    email:
      false,

    address:
      false,

    telephone:
      false,
  },


  robots: {
    index:
      true,

    follow:
      true,

    googleBot: {
      index:
        true,

      follow:
        true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },


  openGraph: {
    type:
      "website",

    siteName:
      "Dualis Creative",

    title:
      "Dualis Creative â€” Creative Visual Studio",

    description:
      "Photography, film and visual direction. Two visions. One story.",

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
      "Dualis Creative â€” Creative Visual Studio",

    description:
      "Photography, film and visual direction. Two visions. One story.",

    images: [
      "/opengraph-image",
    ],
  },


  icons: {
    icon:
      "/icon.png",

    apple:
      "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
