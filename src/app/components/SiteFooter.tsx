import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[var(--card-border)] mt-12">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/icon.png" alt="FocusDragon" width={28} height={28} className="rounded-md" />
            <span className="font-bold">FocusDragon</span>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            The toughest free website &amp; app blocker for macOS. 6 layers of
            protection. No account. No subscription.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">
            Compare
          </div>
          <ul className="space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link href="/vs/cold-turkey" className="hover:text-white transition-colors">vs Cold Turkey</Link></li>
            <li><Link href="/vs/freedom" className="hover:text-white transition-colors">vs Freedom</Link></li>
            <li><Link href="/vs/selfcontrol" className="hover:text-white transition-colors">vs SelfControl</Link></li>
            <li><Link href="/free-website-blocker-mac" className="hover:text-white transition-colors">Free blockers ranked</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">
            Guides
          </div>
          <ul className="space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link href="/block-websites-on-mac" className="hover:text-white transition-colors">Block websites on Mac</Link></li>
            <li><Link href="/for-students" className="hover:text-white transition-colors">For students</Link></li>
            <li><Link href="/for-adhd" className="hover:text-white transition-colors">For ADHD</Link></li>
            <li><Link href="/gambling-blocker-mac" className="hover:text-white transition-colors">Gambling blocker</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-4">
            Product
          </div>
          <ul className="space-y-2.5 text-sm text-[var(--muted)]">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--card-border)] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <span>&copy; {new Date().getFullYear()} FocusDragon &middot; Made in Dubai for focused humans everywhere.</span>
          <span>v1.3.1 &middot; macOS 13 Ventura or later</span>
        </div>
      </div>
    </footer>
  );
}
