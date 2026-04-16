"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import SiteNav from "../components/SiteNav";

type Tab = "Feature Request" | "Bug Report";
type Status = "idle" | "loading" | "success" | "error" | "blocked" | "ratelimited";

export default function Contact() {
  const [tab, setTab] = useState<Tab>("Feature Request");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, type: tab }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setStatus("ratelimited");
          setErrorMsg(data.error);
        } else if (res.status === 422) {
          setStatus("blocked");
          setErrorMsg(data.error);
        } else {
          setStatus("error");
          setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-grid">
      <SiteNav activePath="contact" />

      {/* Hero */}
      <section className="pt-36 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Get in <span className="gradient-text dragon-glow-text">Touch</span>
          </h1>
          <p className="text-[var(--muted)] text-lg">
            Found a bug or have an idea? I read every message.
          </p>
        </div>
      </section>

      {/* Form card */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-10">

            {/* Tab slider */}
            <div className="flex p-1 bg-[var(--background)] rounded-xl mb-8 gap-1">
              {(["Feature Request", "Bug Report"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setStatus("idle"); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    tab === t
                      ? "bg-[var(--accent)] text-white shadow"
                      : "text-[var(--muted)] hover:text-white"
                  }`}
                >
                  {t === "Feature Request" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Feature Request
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      Bug Report
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Context hint */}
            <p className="text-[var(--muted)] text-sm mb-6">
              {tab === "Feature Request"
                ? "Tell me what you'd love to see in FocusDragon."
                : "Describe what happened, what you expected, and your macOS version."}
            </p>

            {/* Success state */}
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Message sent</h3>
                <p className="text-[var(--muted)]">Thanks — I&apos;ll get back to you as soon as I can.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="contact-input w-full rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="contact-input w-full rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      tab === "Feature Request"
                        ? "I'd love to see..."
                        : "When I do X, Y happens instead of Z. macOS version: ..."
                    }
                    className="contact-input w-full rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none resize-none"
                  />
                </div>

                {/* Error states */}
                {(status === "error" || status === "blocked" || status === "ratelimited") && (
                  <div className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
                    status === "blocked" || status === "ratelimited"
                      ? "bg-red-500/10 border border-red-500/20 text-red-300"
                      : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-300"
                  }`}>
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[var(--accent)] hover:bg-[var(--accent-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      Send {tab}
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-neutral-600">
                  Messages are scanned for safety before delivery.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="FocusDragon" width={24} height={24} className="rounded-md" />
            <span className="font-medium">FocusDragon</span>
            <span className="text-xs text-[var(--muted)]">v1.1.0</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <span>Made for focused humans</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
