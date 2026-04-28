"use client";

import { useEffect, useState } from "react";

const TOTAL_SECONDS = 60;

export default function UninstallGuide() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [revealed, setRevealed] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (revealed) return;
    if (secondsLeft <= 0) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, revealed]);

  const progress = ((TOTAL_SECONDS - secondsLeft) / TOTAL_SECONDS) * 100;

  const commands: { title: string; command: string; note: string }[] = [
    {
      title: "1. Stop all FocusDragon processes",
      command: "pkill -9 FocusDragon; pkill -9 FocusDragonDaemon",
      note: "Immediately terminates the app and the background service.",
    },
    {
      title: "2. Unregister the background service",
      command:
        "launchctl bootout gui/$(id -u)/com.anaygoenka.FocusDragonDaemon 2>/dev/null; launchctl remove com.anaygoenka.FocusDragonDaemon 2>/dev/null",
      note: "Removes the LaunchAgent so it won't restart on reboot.",
    },
    {
      title: "3. Remove FocusDragon app files",
      command:
        'rm -rf "/Applications/FocusDragon.app" ~/Library/Application\\ Support/FocusDragon ~/Library/Containers/com.anaygoenka.FocusDragon ~/Library/Preferences/com.anaygoenka.FocusDragon.plist',
      note: "Deletes the app bundle, settings, and container data.",
    },
    {
      title: "4. Restore your hosts file (if modified)",
      command: "sudo cp /etc/hosts.focusdragon.bak /etc/hosts 2>/dev/null || true",
      note: "FocusDragon keeps a backup. This restores it if one exists.",
    },
  ];

  const copy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    });
  };

  return (
    <div className="space-y-6">
      {/* Warning card */}
      <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">⚠️</div>
          <div>
            <h2 className="text-lg font-bold text-red-200 mb-2">
              Before you uninstall — a gentle pause.
            </h2>
            <p className="text-sm text-red-100/80 leading-relaxed">
              FocusDragon exists to put friction between you and the thing you
              said you wanted to block. If you&apos;re reading this in a moment
              of weakness, that&apos;s exactly when the friction matters most.
              We&apos;re going to wait 60 seconds before showing the uninstall
              commands. Take a breath. Go for a walk. Drink some water. If you
              still want to remove it after the timer, the instructions will be
              right here.
            </p>
          </div>
        </div>
      </div>

      {/* Timer / reveal */}
      {!revealed ? (
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-10 text-center">
          <div className="text-6xl font-extrabold tabular-nums gradient-text mb-3">
            {secondsLeft}
          </div>
          <div className="text-[var(--muted)] text-sm mb-6">
            seconds remaining
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-6 text-xs text-[var(--muted)] max-w-md mx-auto leading-relaxed">
            If you blocked this FAQ page with FocusDragon and are trying to
            uninstall the app in one panicked click — this pause is for you.
            Consider whether future-you will thank you for uninstalling.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-6 text-sm text-[var(--accent)] hover:underline"
          >
            ← Nevermind, take me back
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <h2 className="text-lg font-bold mb-2">How to uninstall FocusDragon</h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Open <span className="text-white">Terminal.app</span> (Cmd+Space →
              &ldquo;Terminal&rdquo;) and run these commands in order. Each step
              has a <span className="text-white">Copy</span> button. You&apos;ll
              be asked for your Mac password on step 4.
            </p>
          </div>

          {commands.map((cmd, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden"
            >
              <div className="px-6 pt-5 pb-3 flex items-center justify-between">
                <h3 className="font-semibold text-white">{cmd.title}</h3>
                <button
                  onClick={() => copy(cmd.command, i)}
                  className="text-xs px-3 py-1.5 rounded-md border border-[var(--card-border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--muted)] transition-colors"
                >
                  {copiedIndex === i ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <pre className="px-6 pb-4 text-sm font-mono text-white/90 overflow-x-auto">
                <code>{cmd.command}</code>
              </pre>
              <div className="px-6 pb-5 text-xs text-[var(--muted)] border-t border-[var(--card-border)] pt-3">
                {cmd.note}
              </div>
            </div>
          ))}

          {/* Finder fallback */}
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <h3 className="font-semibold text-white mb-2">
              Prefer to drag-and-drop?
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              After running the first two commands (stopping processes and
              unregistering the service), you can also open Finder →
              Applications, find <span className="text-white">FocusDragon</span>
              , and drag it to the Trash. The terminal steps are the only way
              to fully remove the background service and config files.
            </p>
          </div>

          {/* Sorry to see you go */}
          <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-6 text-center">
            <div className="text-sm text-white mb-2">
              Sorry to see you go. 🐉
            </div>
            <div className="text-xs text-[var(--muted)]">
              If something broke, we&apos;d rather fix it than lose you.{" "}
              <a
                href="mailto:anay.goenka@icloud.com"
                className="text-[var(--accent)] hover:underline"
              >
                Email us
              </a>
              .
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
