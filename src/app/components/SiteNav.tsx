import Image from "next/image";
import Link from "next/link";

interface SiteNavProps {
  activePath?: "home" | "about" | "changelog" | "faqs" | "contact";
}

export default function SiteNav({ activePath = "home" }: SiteNavProps) {
  const linkClass = (key: SiteNavProps["activePath"]) =>
    activePath === key
      ? "text-white font-medium transition-colors"
      : "hover:text-white transition-colors";

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icon.png"
            alt="FocusDragon"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-lg">FocusDragon</span>
          <span className="text-xs text-[var(--muted)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-2 py-0.5">
            v1.3.5
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          <Link href="/" className={linkClass("home")}>
            Home
          </Link>
          <Link href="/about" className={linkClass("about")}>
            About
          </Link>
          <Link href="/faqs" className={linkClass("faqs")}>
            FAQs
          </Link>
          <Link
            href="/#download"
            className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-light)] transition-colors"
          >
            Download
          </Link>
        </div>
      </div>
    </nav>
  );
}
