import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import { faqs, faqCategories } from "./faqs";
import FaqGrid from "./FaqGrid";

export const metadata: Metadata = {
  title: "FAQs — FocusDragon",
  description:
    "Answers to common questions about FocusDragon — setup, Safari extension, permissions, troubleshooting, and more.",
};

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav activePath="faqs" />

      {/* Hero */}
      <section className="pt-36 pb-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-8 text-sm">
            <span className="text-[var(--muted)]">Help & answers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Frequently Asked{" "}
            <span className="gradient-text dragon-glow-text">Questions</span>
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll help.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-28">
        <FaqGrid faqs={faqs} categories={faqCategories} />
      </section>
    </div>
  );
}
