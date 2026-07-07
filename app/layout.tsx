import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050508",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: "skrra.dev",
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  // Google Search Console-token läggs i .env (GOOGLE_SITE_VERIFICATION).
  // Saknas variabeln utelämnas taggen helt.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location,
    addressCountry: "SE",
  },
  sameAs: [site.githubUrl, site.linkedinUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
