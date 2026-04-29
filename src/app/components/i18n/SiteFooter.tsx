import Image from "next/image";
import Link from "next/link";
import type { Dict } from "../../i18n/dictionary";
import type { Locale } from "../../i18n/locales";
import { tpl } from "../../i18n/translations";

interface Props {
  d: Dict;
  locale: Locale;
}

const APP_VERSION = "1.3.9";

export default function SiteFooter({ d, locale }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--card-border)] mt-12">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/icon.png" alt="FocusDragon" width={28} height={28} className="rounded-md" />
            <span className="font-bold">FocusDragon</span>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{d.footer.tagline}</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">{d.footer.compare}</div>
          <ul className="space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link href={`/${locale}/vs/cold-turkey`} className="hover:text-white transition-colors">{d.footer.vsColdTurkey}</Link></li>
            <li><Link href={`/${locale}/vs/freedom`} className="hover:text-white transition-colors">{d.footer.vsFreedom}</Link></li>
            <li><Link href={`/${locale}/vs/selfcontrol`} className="hover:text-white transition-colors">{d.footer.vsSelfControl}</Link></li>
            <li><Link href={`/${locale}/free-website-blocker-mac`} className="hover:text-white transition-colors">{d.footer.freeBlockersRanked}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">{d.footer.guides}</div>
          <ul className="space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link href={`/${locale}/block-websites-on-mac`} className="hover:text-white transition-colors">{d.footer.blockWebsitesGuide}</Link></li>
            <li><Link href={`/${locale}/for-students`} className="hover:text-white transition-colors">{d.footer.forStudents}</Link></li>
            <li><Link href={`/${locale}/for-adhd`} className="hover:text-white transition-colors">{d.footer.forAdhd}</Link></li>
            <li><Link href={`/${locale}/gambling-blocker-mac`} className="hover:text-white transition-colors">{d.footer.gamblingBlocker}</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">{d.footer.product}</div>
          <ul className="space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link href={`/${locale}`} className="hover:text-white transition-colors">{d.footer.home}</Link></li>
            <li><Link href={`/${locale}/faqs`} className="hover:text-white transition-colors">{d.footer.faqs}</Link></li>
            <li><Link href={`/${locale}/changelog`} className="hover:text-white transition-colors">{d.footer.changelog}</Link></li>
            <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{d.footer.privacy}</Link></li>
            <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{d.footer.contact}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--card-border)] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <span>{tpl(d.footer.copyright, { year })}</span>
          <span>{tpl(d.footer.versionLine, { version: APP_VERSION })}</span>
        </div>
      </div>
    </footer>
  );
}
