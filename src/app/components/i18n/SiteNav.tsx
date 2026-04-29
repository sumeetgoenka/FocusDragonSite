import Image from "next/image";
import Link from "next/link";
import type { Dict } from "../../i18n/dictionary";
import type { Locale } from "../../i18n/locales";

interface SiteNavProps {
  d: Dict;
  locale: Locale;
  activePath?: "home" | "changelog" | "faqs" | "contact";
}

/// Locale-aware site navigation. All link hrefs are prefixed with
/// `/<locale>` so users stay inside their language while clicking
/// around. The `activePath` flag is purely visual.
export default function SiteNav({ d, locale, activePath = "home" }: SiteNavProps) {
  const linkClass = (key: SiteNavProps["activePath"]) =>
    activePath === key
      ? "text-white font-medium transition-colors"
      : "hover:text-white transition-colors";

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/icon.png" alt="FocusDragon" width={32} height={32} className="rounded-lg" />
          <span className="font-bold text-lg">FocusDragon</span>
          <span className="text-xs text-[var(--muted)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-2 py-0.5">
            v1.3.9
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          <Link href={`/${locale}`} className={linkClass("home")}>{d.nav.home}</Link>
          <Link href={`/${locale}/faqs`} className={linkClass("faqs")}>{d.nav.faqs}</Link>
          <Link
            href={`/${locale}#download`}
            className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-light)] transition-colors"
          >
            {d.nav.download}
          </Link>
        </div>
      </div>
    </nav>
  );
}
