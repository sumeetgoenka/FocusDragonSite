"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Faq, FaqCategory } from "./faqs";

interface FaqGridProps {
  faqs: Faq[];
  categories: FaqCategory[];
}

export default function FaqGrid({ faqs, categories }: FaqGridProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      if (activeCategory !== "All" && faq.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        faq.question,
        faq.short,
        faq.category,
        ...(faq.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [faqs, query, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Search bar */}
      <div className="relative mb-6">
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs — try 'safari', 'uninstall', 'permissions'…"
          className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl pl-14 pr-5 py-5 text-lg text-white placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors"
        />
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <CategoryPill
          label="All"
          active={activeCategory === "All"}
          onClick={() => setActiveCategory("All")}
        />
        {categories.map((c) => (
          <CategoryPill
            key={c}
            label={c}
            active={activeCategory === c}
            onClick={() => setActiveCategory(c)}
          />
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[var(--muted)]">
          <div className="text-5xl mb-4">🤔</div>
          <div className="text-lg">No FAQs match &ldquo;{query}&rdquo;.</div>
          <div className="text-sm mt-2">
            Try a different keyword or{" "}
            <Link
              href="/contact"
              className="text-[var(--accent)] hover:underline"
            >
              contact us
            </Link>
            .
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((faq) => (
            <FaqCard key={faq.slug} faq={faq} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
        active
          ? "bg-[var(--accent)] border-[var(--accent)] text-white"
          : "bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--muted)] hover:text-white hover:border-[var(--muted)]"
      }`}
    >
      {label}
    </button>
  );
}

function FaqCard({ faq }: { faq: Faq }) {
  const isUninstall = faq.category === "Uninstall";
  return (
    <Link
      href={`/faqs/${faq.slug}`}
      className={`feature-card aspect-square rounded-2xl bg-[var(--card-bg)] p-6 flex flex-col justify-between group ${
        isUninstall ? "ring-1 ring-red-500/40 hover:ring-red-500/60" : ""
      }`}
    >
      <div>
        <div className="text-4xl mb-4">{faq.icon}</div>
        <h3 className="text-lg font-bold mb-2 leading-snug text-white group-hover:text-[var(--accent)] transition-colors">
          {faq.question}
        </h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
          {faq.short}
        </p>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--card-border)]">
        <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
          {faq.category}
        </span>
        <svg
          className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
