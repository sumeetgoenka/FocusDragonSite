import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FocusDragon — The Toughest Free Website & App Blocker for Mac",
  description:
    "FocusDragon is a free, open-source macOS app that blocks distracting websites and applications using 6 layers of protection. DNS-level blocking, process monitoring, background daemon, browser extensions, lock mechanisms, and anti-tamper — all for free.",
  keywords: [
    "website blocker",
    "app blocker",
    "mac",
    "macos",
    "focus",
    "productivity",
    "free",
    "open source",
    "distraction blocker",
    "cold turkey alternative",
    "freedom alternative",
  ],
  openGraph: {
    title: "FocusDragon — The Toughest Free Website & App Blocker for Mac",
    description:
      "6 layers of distraction blocking. Free & open source. Built natively for macOS.",
    type: "website",
    url: "https://focusdragon.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "FocusDragon — The Toughest Free Website & App Blocker for Mac",
    description:
      "6 layers of distraction blocking. Free & open source. Built natively for macOS.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
