import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import { faqs, type FaqAnswerBlock } from "../faqs";
import UninstallGuide from "./UninstallGuide";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return faqs.map((faq) => ({ slug: faq.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = faqs.find((f) => f.slug === slug);
  if (!faq) return { title: "FAQ — FocusDragon" };
  return {
    title: `${faq.question} — FocusDragon FAQ`,
    description: faq.short,
  };
}

export default async function FaqDetailPage({ params }: Props) {
  const { slug } = await params;
  const faq = faqs.find((f) => f.slug === slug);
  if (!faq) notFound();

  const isUninstall = faq.slug === "i-made-a-fatal-mistake";

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav activePath="faqs" />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="hero-glow" aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white transition-colors mb-10"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All FAQs
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="text-6xl mb-5">{faq.icon}</div>
            <div className="text-xs uppercase tracking-wider text-[var(--accent)] font-medium mb-3">
              {faq.category}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {faq.question}
            </h1>
          </div>

          {/* Body */}
          {isUninstall ? (
            <UninstallGuide />
          ) : faq.answer && faq.answer.length > 0 ? (
            <article className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 md:p-10 space-y-5">
              {faq.answer.map((block, i) => (
                <AnswerBlock key={i} block={block} />
              ))}
            </article>
          ) : (
            <div className="rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] p-8 text-[var(--muted)]">
              This FAQ is coming soon.
            </div>
          )}

          {/* Still need help */}
          <div className="mt-12 text-center text-sm text-neutral-500">
            Still stuck?{" "}
            <Link
              href="/contact"
              className="text-[var(--accent)] hover:underline"
            >
              Send me a message
            </Link>
            .
          </div>
        </div>
      </section>
    </div>
  );
}

function AnswerBlock({ block }: { block: FaqAnswerBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-xl font-bold text-white mt-2">{block.text}</h2>
      );
    case "paragraph":
      return (
        <p className="text-base text-[var(--muted)] leading-relaxed">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-2 pl-5 list-disc marker:text-[var(--accent)] text-[var(--muted)] leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="bg-black/60 border border-[var(--card-border)] rounded-xl p-4 overflow-x-auto text-sm text-white/90 font-mono">
          <code>{block.text}</code>
        </pre>
      );
    case "callout":
      return (
        <div
          className={`rounded-xl p-4 border text-sm leading-relaxed ${
            block.tone === "warning"
              ? "bg-red-500/10 border-red-500/30 text-red-200"
              : "bg-[var(--accent)]/10 border-[var(--accent)]/30 text-white"
          }`}
        >
          {block.text}
        </div>
      );
  }
}
