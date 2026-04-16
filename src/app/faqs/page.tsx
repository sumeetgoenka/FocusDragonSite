import Link from "next/link";
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
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] md:leading-[1.05] font-black tracking-tight mb-6">
            Before you try to
            <br />
            <span className="gradient-text dragon-glow-text">
              outsmart it.
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-xl mx-auto leading-relaxed mb-4">
            Setup, permissions, troubleshooting, and the nuclear option.
          </p>
          <p className="text-sm text-neutral-500">
            Can&apos;t find your answer?{" "}
            <Link href="/contact" className="text-[var(--accent)] hover:underline">
              Reach out
            </Link>{" "}
            — I read every message.
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
