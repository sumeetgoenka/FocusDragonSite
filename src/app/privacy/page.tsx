import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FocusDragon",
  description:
    "FocusDragon does not collect, transmit, or sell your data. Everything stays on your device.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-grid">
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
              v1.1.0
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link>
            <Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link
              href="/#download"
              className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-light)] transition-colors"
            >
              Download
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[var(--muted)] mb-10">Last updated: April 14, 2026</p>

          <div className="space-y-8 text-[var(--muted)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The short version</h2>
              <p>
                FocusDragon does not collect, store, or transmit any of your personal data.
                The app and its browser extensions run entirely on your device. There is no
                account, no server, no analytics, no tracking, and no third-party data
                sharing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What the app does on your device</h2>
              <p className="mb-3">
                FocusDragon stores the following on your Mac, locally, in your user
                directory. None of it leaves your machine:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Your block lists, schedules, and focus session preferences.</li>
                <li>Session history (start time, duration, whether it was completed).</li>
                <li>Pomodoro statistics.</li>
                <li>App settings and onboarding state.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What the browser extensions do</h2>
              <p className="mb-3">
                The FocusDragon browser extensions (Chrome, Safari, Edge, Brave, Opera,
                Vivaldi, Firefox) enforce blocking inside your browser. They work by:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Reading your block list and session state from the FocusDragon desktop
                  app via the browser&apos;s native messaging API (in Chromium browsers) or
                  Safari Web Extension API (in Safari). This communication happens
                  entirely on your Mac.
                </li>
                <li>
                  Checking each page you navigate to against your block list. If a page
                  matches, the extension redirects the tab to a &ldquo;Site Blocked&rdquo; page
                  hosted inside the extension itself.
                </li>
                <li>
                  Sending a periodic heartbeat to the desktop app so it knows the
                  extension is installed and active. The heartbeat contains no URL or
                  browsing data — only a timestamp and permission flags.
                </li>
              </ul>
              <p className="mt-3">
                The extensions do <strong className="text-white">not</strong> log your browsing
                history, read page content, track you across sites, or transmit any data
                off your device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Why the extensions request broad permissions</h2>
              <p className="mb-3">
                To enforce blocking reliably, the browser extensions request:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-white">Access to all websites</strong> — so the extension
                  can check whether any site you visit is on your block list.
                </li>
                <li>
                  <strong className="text-white">Tabs and webNavigation</strong> — so the extension
                  can redirect a tab to the block page before a blocked site loads.
                </li>
                <li>
                  <strong className="text-white">Native messaging</strong> — so the extension can ask
                  the FocusDragon desktop app for the current block list.
                </li>
                <li>
                  <strong className="text-white">Incognito / private browsing</strong> — so blocks
                  cannot be bypassed by opening a private window. You grant this
                  permission manually.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">No accounts, no servers, no analytics</h2>
              <p>
                FocusDragon has no login system, no backend, and no analytics SDK. The
                website you are reading this on (focusdragon.vercel.app) is served by
                Vercel and uses Vercel&apos;s own infrastructure logging — we do not add
                trackers, pixels, cookies, or fingerprinting on top of it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Updates</h2>
              <p>
                The macOS app checks for updates using Sparkle. That check makes a
                request to <code>focusdragon.vercel.app/appcast.xml</code> so the app can see if
                a new version is available. The request contains no personal data beyond
                what every HTTP request contains (your IP address and user agent, handled
                by Vercel).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Children</h2>
              <p>
                FocusDragon is safe for users of any age. Because no data is collected,
                there is nothing to protect, anonymize, or delete on request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Changes to this policy</h2>
              <p>
                If FocusDragon ever changes what data it handles, this page will be
                updated and the &ldquo;last updated&rdquo; date above will change. If a future
                change introduces any data collection, it will be opt-in and announced in
                the changelog.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Contact</h2>
              <p>
                Questions about privacy: <a className="text-white underline" href="mailto:anaygoenka12@gmail.com">anaygoenka12@gmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--card-border)] py-10 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-white transition-colors">← Back to FocusDragon</Link>
        </div>
      </footer>
    </div>
  );
}
