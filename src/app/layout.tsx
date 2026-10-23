import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { config } from "@/data/config";

import Script from "next/script";
import SiteFrame from "@/components/site-frame";
import GitHubStars from "@/components/header/github-stars";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { UMAMI_SRC } from "@/lib/umami";

/* Body/base font — Space Grotesk, bound to --font-sans (applied as `font-sans`
 * on <html>). Everything that isn't a heading inherits this.
 * Self-hosted from /public/fonts so the build never needs network access. */
const spaceGroteskSans = localFont({
  src: [
    {
      path: "../../public/fonts/space-grotesk-latin.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../public/fonts/space-grotesk-latin-ext.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* Heading font — Unbounded, bound to --font-display and applied to h1–h6. */
const unbounded = localFont({
  src: [
    {
      path: "../../public/fonts/unbounded-latin.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/unbounded-latin-ext.woff2",
      weight: "200 900",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  // pins every relative/OG url to the .dev origin so nothing canonicalises back to .site
  metadataBase: new URL(config.site),
  alternates: { canonical: "./" },
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={[
        spaceGroteskSans.variable,
        unbounded.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        {process.env.UMAMI_SITE_ID && (
          <Script
            defer
            src={UMAMI_SRC}
            data-website-id={process.env.UMAMI_SITE_ID}
          />
        )}
      </head>
      <body>
        <Providers>
          <SiteFrame githubStars={<GitHubStars className="mr-4" />}>
            {children}
          </SiteFrame>
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
