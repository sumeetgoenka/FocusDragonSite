import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — FocusDragon AI",
  description:
    "FocusDragon AI: focus blocks that watch your screen and stop you intelligently. $3.99/mo or $14.99/mo for AI Plus.",
  alternates: { canonical: "/pricing" },
};

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Manual blocking, blocklists, browser extension, auto-update.",
    bullets: [
      "Block any app or website",
      "Custom blocklists & schedules",
      "Browser extension (Chrome + Safari)",
      "Bring-your-own Anthropic key for AI (free with your own Claude key)",
    ],
    cta: "Already included",
    disabled: true,
  },
  {
    id: "ai",
    name: "AI",
    price: "$3.99",
    cadence: "/month",
    blurb: "Intent-aware blocking with up to 40 hours of AI-watched focus per month.",
    bullets: [
      "Drift detection: AI catches you the moment you slip",
      "Natural-language block creation",
      "Smart distraction suggestions",
      "Up to 40 hours of AI focus time per month",
    ],
    cta: "Upgrade to AI",
    highlight: false,
  },
  {
    id: "ai_plus",
    name: "AI Plus",
    price: "$14.99",
    cadence: "/month",
    blurb: "For deep workers — 250 hours/month is more than anyone really uses.",
    bullets: [
      "Everything in AI",
      "250 hours/month — effectively unlimited",
      "Priority on new AI features",
      "Direct line to me for feedback",
    ],
    cta: "Upgrade to AI Plus",
    highlight: true,
  },
];

export default function PricingPage() {
  const isTestMode = (process.env.STRIPE_SECRET_KEY ?? "").startsWith("sk_test_");

  return (
    <div className="min-h-screen bg-grid">
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {isTestMode && (
            <div className="mb-8 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-5 py-4 text-sm text-yellow-200">
              <strong>Beta — Test Mode.</strong> Payments are simulated. Use Stripe test card{" "}
              <code className="font-mono">4242 4242 4242 4242</code>, any future expiry, any CVC.
            </div>
          )}

          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Pricing
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              FocusDragon stays free. Pay only if you want the AI to actively keep you on task.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-2xl border p-7 flex flex-col ${
                  tier.highlight
                    ? "border-[var(--accent)] bg-[var(--accent)]/5"
                    : "border-[var(--card-border)] bg-[var(--card-bg)]"
                }`}
              >
                {tier.highlight && (
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                    Most popular
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-black">{tier.price}</span>
                  <span className="text-neutral-400">{tier.cadence}</span>
                </div>
                <p className="text-sm text-neutral-400 mb-5">{tier.blurb}</p>
                <ul className="space-y-2.5 text-sm mb-7 flex-1">
                  {tier.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-[var(--accent)] flex-shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled={tier.disabled}
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${
                    tier.disabled
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                      : tier.highlight
                      ? "bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white"
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                >
                  {tier.cta}
                </button>
                {!tier.disabled && (
                  <p className="text-xs text-neutral-500 mt-3 text-center">
                    Open this page from inside the FocusDragon app to upgrade.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-14 text-center text-sm text-neutral-400 max-w-2xl mx-auto">
            <p>
              Already paying? Manage your subscription from inside the app at{" "}
              <span className="text-neutral-300">Settings → AI → Manage Subscription</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
