import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import LandingCookie from "./components/LandingCookie";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.focusdragon.app"),
  title: {
    default: "FocusDragon — The Toughest Free Website & App Blocker for Mac",
    template: "%s | FocusDragon",
  },
  description:
    "FocusDragon is a free macOS app that blocks distracting websites and applications using 6 layers of protection. DNS-level blocking, process monitoring, background daemon, browser extensions, lock mechanisms, and anti-tamper — all for free.",
  keywords: [
    "website blocker",
    "app blocker",
    "mac",
    "macos",
    "focus",
    "productivity",
    "free",
    "native macos",
    "distraction blocker",
    "cold turkey alternative",
    "freedom alternative",
    "selfcontrol alternative",
    "block websites on mac",
    "free website blocker mac",
    "gambling blocker mac",
    "adhd focus tool",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "FocusDragon — The Toughest Free Website & App Blocker for Mac",
    description:
      "6 layers of distraction blocking. Free forever. Built natively for macOS.",
    type: "website",
    url: "https://www.focusdragon.app",
    siteName: "FocusDragon",
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusDragon — The Toughest Free Website & App Blocker for Mac",
    description:
      "6 layers of distraction blocking. Free forever. Built natively for macOS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FocusDragon",
  url: "https://www.focusdragon.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.focusdragon.app/faqs?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FocusDragon",
  url: "https://www.focusdragon.app",
  logo: "https://www.focusdragon.app/icon.png",
  founder: {
    "@type": "Person",
    name: "Anay Goenka",
    url: "https://anaygoenka.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `if("scrollRestoration" in history) history.scrollRestoration="manual";`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, organizationSchema]) }}
        />
        <LandingCookie />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
