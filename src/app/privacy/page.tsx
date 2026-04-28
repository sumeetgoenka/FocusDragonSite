import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Privacy Policy — FocusDragon",
  description:
    "FocusDragon never collects your blocklist, browsing history, or personal data. Crash reports are always on; anonymous usage stats are strictly opt-in.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav />

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[var(--muted)] mb-10">Last updated: April 15, 2026</p>

          <div className="space-y-8 text-[var(--muted)] leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The short version</h2>
              <p className="mb-3">
                FocusDragon never sees your blocklist, browsing history, or anything
                you do inside your browser. There is no account, no login, and no
                server that stores your data.
              </p>
              <p className="mb-3">
                Two things leave your device, and only these two:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-white">Crash reports</strong> (always on) — if
                  the app crashes, a stack trace is sent to Sentry so I can fix it.
                  No personal data, no blocklist, no browsing info.
                </li>
                <li>
                  <strong className="text-white">Anonymous usage stats</strong> (opt-in,
                  off by default) — if you enable this in onboarding or Settings →
                  Privacy, aggregate events like &ldquo;focus session started&rdquo; are
                  sent to PostHog to help prioritise what to build next.
                </li>
              </ul>
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
              <h2 className="text-2xl font-bold text-white mb-3">Crash reports (Sentry)</h2>
              <p className="mb-3">
                FocusDragon uses <a className="text-white underline" href="https://sentry.io" target="_blank" rel="noreferrer">Sentry</a> to
                capture crashes and uncaught errors. When the app crashes, Sentry
                records:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>The crash stack trace (function names and line numbers).</li>
                <li>macOS version and app version.</li>
                <li>The sequence of recent operations that led to the crash.</li>
              </ul>
              <p className="mt-3">
                IP addresses are explicitly <strong className="text-white">not</strong> collected.
                Crash data is hosted in the EU (<code>de.sentry.io</code>). This reporting is
                always on because without it, I cannot fix bugs I don&apos;t know about — but
                it only fires on errors, never on normal use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Anonymous usage stats (PostHog, opt-in)</h2>
              <p className="mb-3">
                If — and only if — you explicitly enable the &ldquo;Help improve
                FocusDragon&rdquo; toggle during onboarding or in Settings → Privacy,
                the app sends a small set of anonymous events to{" "}
                <a className="text-white underline" href="https://posthog.com" target="_blank" rel="noreferrer">PostHog</a>{" "}
                (EU region, <code>eu.i.posthog.com</code>). This is off by default. You can
                turn it off at any time and nothing new will be sent.
              </p>
              <p className="mb-3">
                The events collected are things like:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><code>onboarding_step_reached</code> (which onboarding step you reached)</li>
                <li><code>onboarding_completed</code></li>
                <li><code>focus_session_started</code> (number of blocked domains, protection level)</li>
                <li><code>focus_session_ended</code></li>
                <li>App open / background lifecycle events</li>
              </ul>
              <p className="mt-3">
                What is <strong className="text-white">never</strong> collected, even when enabled:
                the domains on your blocklist, the names or paths of blocked apps,
                any URLs you visit, any content from your browser, and anything that
                could identify you. The user identifier is a random UUID that lives
                only on your Mac.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">No accounts, no servers</h2>
              <p>
                FocusDragon has no login system and no backend that stores your
                data. The website you are reading this on (focusdragon.vercel.app)
                is served by Vercel and uses Vercel&apos;s own infrastructure logging;
                we do not add trackers, pixels, cookies, or fingerprinting on top
                of it.
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
                updated and the &ldquo;last updated&rdquo; date above will change. Any new data
                collection beyond crash reports will remain opt-in and will be
                announced in the changelog.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Contact</h2>
              <p>
                Questions about privacy: <a className="text-white underline" href="mailto:anay.goenka@icloud.com">anay.goenka@icloud.com</a>
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
