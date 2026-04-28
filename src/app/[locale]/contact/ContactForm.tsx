"use client";

import { useState, FormEvent } from "react";
import type { Dict } from "../../i18n/dictionary";

type Tab = "Feature Request" | "Bug Report";
type Status = "idle" | "loading" | "success" | "error" | "blocked" | "ratelimited";

export default function ContactForm({ d }: { d: Dict }) {
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
        if (res.status === 429) { setStatus("ratelimited"); setErrorMsg(data.error); }
        else if (res.status === 422) { setStatus("blocked"); setErrorMsg(data.error); }
        else { setStatus("error"); setErrorMsg(data.error ?? d.contact.errorGeneric); }
        return;
      }
      setStatus("success"); setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(d.contact.errorGeneric);
    }
  }

  return (
    <div className="feature-card dragon-glow rounded-3xl bg-[var(--card-bg)] p-8 md:p-10">
      <div className="flex p-1 bg-[var(--background)] rounded-xl mb-8 gap-1">
        {(["Feature Request", "Bug Report"] as Tab[]).map((tName) => (
          <button key={tName} onClick={() => { setTab(tName); setStatus("idle"); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === tName ? "bg-[var(--accent)] text-white shadow" : "text-[var(--muted)] hover:text-white"
            }`}>
            {tName}
          </button>
        ))}
      </div>

      {status === "success" ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">{d.contact.successTitle}</h3>
          <p className="text-[var(--muted)]">{d.contact.successBody}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">{d.contact.nameLabel}</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder={d.contact.namePlaceholder}
                className="contact-input w-full rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{d.contact.emailLabel}</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={d.contact.emailPlaceholder}
                className="contact-input w-full rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{d.contact.messageLabel}</label>
            <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder={d.contact.messagePlaceholder}
              className="contact-input w-full rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none resize-none" />
          </div>
          {(status === "error" || status === "blocked" || status === "ratelimited") && (
            <div className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
              status === "blocked" || status === "ratelimited"
                ? "bg-red-500/10 border border-red-500/20 text-red-300"
                : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-300"
            }`}>
              {errorMsg}
            </div>
          )}
          <button type="submit" disabled={status === "loading"}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all">
            {status === "loading" ? d.contact.submitting : d.contact.submit}
          </button>
        </form>
      )}
    </div>
  );
}
