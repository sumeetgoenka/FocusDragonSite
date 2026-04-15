import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chrome Extension Setup — FocusDragon",
  description:
    "Finish setting up the FocusDragon Chrome extension so blocks can't be bypassed in any browser.",
};

export default function ExtensionSetup() {
  const steps: { title: string; body: string }[] = [
    {
      title: "1. Install the FocusDragon app for Mac",
      body:
        "The extension does nothing on its own — it reads your block list and session state from the FocusDragon macOS app. If you haven't installed it yet, grab it from focusdragon.vercel.app and finish onboarding before continuing.",
    },
    {
      title: "2. Allow communication with the FocusDragon app",
      body:
        "The first time a focus session starts, Chrome may ask whether to allow the extension to communicate with 'com.focusdragon.nativehost'. Click Allow. Without this, the extension can't fetch your block list.",
    },
    {
      title: "3. Enable the extension in incognito",
      body:
        "Open chrome://extensions, find FocusDragon, click Details, and turn on 'Allow in Incognito'. Without this, incognito windows are an escape hatch around every block — which is why the extension marks itself 'not fully configured' until this is on.",
    },
    {
      title: "4. Keep host permissions set to 'On all sites'",
      body:
        "Under Details, make sure 'Site access' is set to 'On all sites'. The extension only reads the URL of the page you're navigating to — it never reads page content.",
    },
  ];

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
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <div className="mb-10">
          <span className="inline-block text-xs uppercase tracking-wider text-[var(--muted)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-3 py-1 mb-4">
            Chrome extension
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Finish setting up the FocusDragon Chrome extension
          </h1>
          <p className="text-lg text-[var(--muted)]">
            The extension is installed — nice. A few small toggles and it'll enforce
            every block you set in the Mac app, in every Chrome window (including
            incognito). No accounts, no browsing data leaves your Mac.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
              <p className="text-[var(--muted)] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
          <h2 className="text-xl font-semibold mb-2">What this extension does</h2>
          <ul className="list-disc pl-5 space-y-1 text-[var(--muted)]">
            <li>Redirects any blocked site to a clean &quot;Site Blocked&quot; page before it loads.</li>
            <li>Blocks subdomains automatically (blocking example.com also blocks mail.example.com).</li>
            <li>Works in incognito once you enable it there.</li>
            <li>Respects every lock mode in the app — timer, schedule, random-text, breakable.</li>
            <li>Does absolutely nothing when no focus session is running.</li>
          </ul>
        </div>

        <div className="mt-12 text-sm text-[var(--muted)]">
          Questions? See the{" "}
          <Link href="/privacy" className="underline hover:text-white">privacy policy</Link>
          {" "}or{" "}
          <Link href="/contact" className="underline hover:text-white">contact page</Link>.
        </div>
      </main>
    </div>
  );
}
