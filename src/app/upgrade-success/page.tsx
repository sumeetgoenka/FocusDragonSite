import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to FocusDragon AI",
  description: "Your subscription is active. You can return to FocusDragon now.",
  robots: { index: false, follow: false },
};

export default function UpgradeSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl mb-6">🐉</div>
        <h1 className="text-3xl md:text-4xl font-black mb-4">Welcome to FocusDragon AI</h1>
        <p className="text-neutral-400 mb-8">
          Your subscription is active. Return to the FocusDragon app — AI features are unlocked.
        </p>
        <a
          href="focusdragon://upgrade-complete"
          className="inline-block bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-bold px-8 py-4 rounded-2xl transition-colors"
        >
          Open FocusDragon
        </a>
        <p className="text-xs text-neutral-500 mt-6">
          (Or just switch back to the app — it&apos;ll detect your new entitlement on the next request.)
        </p>
      </div>
    </div>
  );
}
