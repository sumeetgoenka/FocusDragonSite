import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";

export const metadata: Metadata = {
  title: "Changelog — FocusDragon",
  description:
    "See what's new in every FocusDragon release — features, fixes, and improvements.",
};

/* ── Release data ─────────────────────────────────────────── */

interface Release {
  version: string;
  date: string;
  latest?: boolean;
  summary: string;
  changes: string[];
}

const releases: Release[] = [
  {
    version: "1.3.5",
    date: "April 28, 2026",
    latest: true,
    summary:
      "Onboarding got real artwork and a real hatching video. Beat 6 now plays a colour-corrected HEVC-with-alpha hatch sequence and lands on the FocusDragon hero portrait with the catch flow merged in — so onboarding ends on one continuous beat instead of two.",
    changes: [
      "Onboarding: bundled a real hatching video for Beat 6 (HEVC-with-alpha, colour-corrected — saturation/contrast bumped, despill removed). Replaces the procedural particle/EggFragments choreography.",
      "Onboarding: after the hatch video, the new focusdragon.png hero image fades in with \"{name} is ready\" and the catch flow inline (primary button, hoard counter, settled state). The separate Beat 7 \"treasure\" page is gone — the catch lives on the same screen as the reveal.",
      "Onboarding: Beat 5 (Wings) now shows real Safari and Chrome app icons tilted ±12° with a soft orange glow that brightens once a browser is configured. The placeholder claw glyphs are gone.",
      "Onboarding: replaying onboarding used to append a duplicate \"Sleep\" / \"Doomscroll\" / \"Work distractions\" block on each pass. The enemy preset now de-dupes by name and overwrites the existing block in place.",
    ],
  },
  {
    version: "1.3.4",
    date: "April 27, 2026",
    summary:
      "Onboarding polish and a fix for the false \"permission missing\" page Chrome kept opening at block-start even when the extension was fully configured.",
    changes: [
      "Fixed: Chrome opened a \"fix-no-block\" page in a new window every time you started a block, even though the FocusDragon Chrome extension was fully configured. Cause: the app and the daemon both touched a shared chrome-grace-timer file (the app's touch is *protective*, the daemon's touch signals a kill), and the app was misreading its own protective touch as a daemon kill and opening the repair UX. Now we only act on grace-timer advancement when there's real evidence Chrome is unhealthy.",
      "Onboarding: the egg in beats 1–6 used to render as a hand-drawn wireframe outline. Replaced with a warm vertical shell gradient, a soft top-left highlight, and a thin contour line — reads as an actual egg now.",
      "Onboarding: \"Grant\" on the Voice scale (notifications) used to silently fail when notifications had been previously denied at the OS level — macOS won't re-prompt after a deny. The button now opens System Settings → Notifications → FocusDragon and polls for the toggle to flip on.",
      "Onboarding: the preset block created when you pick an enemy (Doomscroll / Sleep / Work) now ships *enabled*, so the \"try opening a blocked site\" test in Beat 7 actually fires the block-page instead of opening the URL un-blocked.",
    ],
  },
  {
    version: "1.3.3",
    date: "April 27, 2026",
    summary:
      "Hotfix: 1.3.2 crashed on launch for any user who hadn't completed onboarding (new installs, or anyone who reset onboarding state). One-line fix in the egg-rendering loop.",
    changes: [
      "Fixed: hard crash on Beat 1 of the new onboarding when the egg's crack count was zero. The Canvas loop traversed `1...0` and tripped a Swift runtime trap. Existing users with completed onboarding were unaffected, but every new 1.3.2 install crashed immediately. The loop now guards against the zero case.",
    ],
  },
  {
    version: "1.3.2",
    date: "April 27, 2026",
    summary:
      "A reimagined onboarding — name your dragon, watch it hatch, earn scales for each permission. Plus custom block icons, a fix for the \"background service won't enable\" bug some users hit on fresh installs, and dead-link cleanup across the extension help flow.",
    changes: [
      "New: 7-beat dragon onboarding. Cold open → name your dragon → pick your enemy → grow scales (permissions reframed as Heart, Claws, Voice) → earn wings (browser extension) → hatching moment → first treasure for the hoard. Every drift caught and every focus session completed grows the hoard from here on.",
      "New: dragon companion in the dashboard. Your named dragon and the hoard counter live in the greeting bar; tap the hoard for the recent-events list.",
      "New: custom block icons. Upload an image, crop it, and your block displays the custom icon everywhere instead of the emoji glyph. Falls back to the emoji if the image is missing.",
      "Fixed: background service couldn't be enabled when FocusDragon was launched from the DMG mount or ~/Downloads. macOS translocates the bundle to a read-only path and SMAppService refuses to register from there — the daemon never appeared under Login Items & Extensions and \"Refresh\" did nothing. FocusDragon now prompts to move itself into /Applications on first launch and relaunches automatically. Existing users in /Applications are unaffected.",
      "Fixed: when registration genuinely fails (signing mismatch, locked /Applications, etc.), the onboarding now shows an inline error explaining the cause instead of silently sitting on a stuck spinner.",
      "Fixed: extension help links opened a 404 (\"Full Disk Access\" page on the marketing site that never existed). The Fix Now button now jumps straight to System Settings → Full Disk Access.",
      "Migrated all in-app help links from focusdragon.vercel.app to the canonical focusdragon.app domain.",
    ],
  },
  {
    version: "1.3.1",
    date: "April 27, 2026",
    summary:
      "AI Powered (Beta) is now its own block type with a dedicated single-pane editor. Plus a stack of fixes for >2-second app hangs that hit users on memory-pressured Macs.",
    changes: [
      "New: \"AI Powered (Beta)\" block type. Sits alongside Website & App and Device as the third top-level mode. The editor strips out the tab bar and gives you one scroll: a BYOK banner if you haven't pasted a key, a \"describe your block\" field, the Suggest/Nudge/Hard enforcement picker, and disclosure sections for hard-blocked websites, apps, exceptions, and advanced rules. Items in the lists are still hard-blocked literally — the AI runs on top.",
      "Removed all AI controls from the regular Website & App and Device blocks. They're purely literal again. Existing blocks that had a per-block task description or stronger enforcement auto-migrate to the new AI Powered type on launch.",
      "Removed the global \"What are you working on?\" Setting. Each AI block carries its own description now, so the global field was redundant.",
      "Fixed: app hangs over 2 seconds when writing block-state files under memory pressure. The atomic writes and JSON encodes now run on a serial background queue instead of the main thread.",
      "Fixed: the macOS user-directory enumeration (3+ synchronous dscl shells) was running on the main thread inside view bodies. Moved off-main with a prewarm at app start; the editor's \"Applies to\" picker no longer hangs the editor on open.",
      "Fixed: Safari restart flow's AppleScript IPC was synchronous on the main thread, hanging during the quit/relaunch sequence. Moved to a background queue.",
      "Fixed: System Settings blocker was polling NSWorkspace once a second. Replaced with NSWorkspace launch notifications plus a re-scan when the lock state flips, eliminating ~86,000 polls/day.",
      "Fixed: DateFormatter allocations inside the dashboard's TimelineView-driven body. Hoisted to static cached instances.",
    ],
  },
  {
    version: "1.3.0",
    date: "April 25, 2026",
    summary:
      "Intent-aware blocking. Tell FocusDragon what you're working on, and it watches what you're actually doing every 30 seconds — drift gets a 5-second blocked page or a force-quit, your call. Plus weekly Sunday focus summaries and a Distraction Suggester that learns from your drift log.",
    changes: [
      "New: Intent-aware blocking. Set a global task on Settings → AI (\"writing my dissertation chapter 3\") and any active block with the AI layer enabled polls the current browser tab or app every 30 seconds, asks Claude Haiku whether it matches your task, and intervenes on drift. Text-only — DOM extraction + macOS Accessibility, never screenshots. BYOK with your Anthropic key.",
      "New: Three per-block enforcement levels. Suggest (log only — see what would have happened), Nudge (first drift = 5-second blocked page on the web or a takeover screen on apps; second drift = force-quit), Hard (force-quit on first drift, every time). Defaults to Suggest so nothing surprises you on day one.",
      "New: Force-quit recovery. The classifier never adds sites to your block list — every poll is independent, every recovery is immediate. Watch MrBeast and you get force-quit; pivot to the math tutorial and you're back to normal.",
      "New: Weekly focus summary. Every Sunday at 7pm, FocusDragon writes a one-paragraph summary of your focus week — top blocks, drift categories, streaks. Tap to view; share as a card.",
      "New: Distraction Suggester. The retrospective view now reads your drift log and suggests sites worth blocking next week, one tap to accept.",
      "App-name enrichment: the classifier now sees \"Slack (com.tinyspeck.slackmacgap, Social Networking)\" instead of an opaque bundle ID, which makes verdicts noticeably better on indie macOS apps.",
      "Removed the soft-overlay drift intervention from 1.2.4 — it was the wrong shape. Drift is now a reflex (force-quit or 5-second blocked page), not a dismissible suggestion.",
    ],
  },
  {
    version: "1.2.4",
    date: "April 24, 2026",
    summary:
      "AI block builder (preview) — describe a block in one sentence and Claude fills in the fields for you. Plus hardened Chrome wake handling and a handful of small fixes.",
    changes: [
      "New: AI block builder. Tap the ✨ \"Describe a block\" button next to Add Block, type a sentence (\"block twitter and reddit 9–5 weekdays, allow gmail at lunch, force lock so I can't cheat\"), and you land in a pre-filled editor you can review before saving. Bring your own Anthropic API key in Settings → AI — paid FocusDragon Pro tier coming with the next big release.",
      "AI: tamperproof inference — phrases like \"force\", \"can't cheat\", \"commit\", \"no escape\" now automatically enable Locked Block on the resulting block. Frozen lock types auto-enable Locked Block unconditionally; the toggle shows forced-on with the subtitle \"Always on for Frozen blocks\".",
      "Fixed: the Frozen lock option was missing from the manual lock-type picker in the block editor (every other lock type worked but you couldn't pick Frozen without the AI builder). It's back.",
      "Fixed: Dashboard \"Focusing\" badge was green on top of an orange gradient — clashed. Now a clean white-on-translucent badge with a pulsing dot.",
      "Daemon: Chrome wake-grace extended from 30s to 60s on top of 1.2.3's timer-gap detection, plus a proper NSWorkspace.didWake observer so the grace is armed the instant the system reports wake (not inferred from the next timer tick). Belt-and-suspenders for the edge case where Chrome's service worker takes longer than 30s to reconnect.",
    ],
  },
  {
    version: "1.2.3",
    date: "April 23, 2026",
    summary:
      "Critical fix: Chrome no longer force-quits on laptop wake, and the chrome://extensions + fix-no-block pages stop opening at block-start when Chrome is already fully configured.",
    changes: [
      "Fixed: Chrome was being force-quit every time you opened your laptop, even with no block active starting fresh. Root cause: the daemon read the heartbeat file's wall-clock age, didn't account for system sleep, and concluded the extension was dead — so it killed Chrome.",
      "Fixed: starting a block while Chrome was fully configured was opening chrome://extensions and the fix-no-block instruction page anyway. This was a downstream effect of the same misfire — the kill triggered the repair-window flow even though nothing was broken.",
      "Daemon now detects sleep gaps (any tick where wall-clock advanced >5× the check interval) and applies a 30-second wake-grace window before resuming heartbeat enforcement, giving Chrome's extension service worker time to reconnect.",
    ],
  },
  {
    version: "1.2.2",
    date: "April 22, 2026",
    summary:
      "UI polish across Extension Status, Pomodoro, Dashboard, Statistics — plus refinements to breaks, Safari restart, and blocked-page styling.",
    changes: [
      "Extension Status: tighter header, real browser app icons (instead of generic globes), the empty Unconfigured section now hides itself, and the misleading red \"Force-quit\" pill is now a neutral \"Unsupported\" badge.",
      "Pomodoro: dropped the redundant centered title, replaced the three tall session chips with a compact segmented control, and merged the round dots + caption onto a single line — the timer ring now has more room to breathe.",
      "Dashboard, Statistics, and BlockStats: layout polish and copy refinements.",
      "Random-text breaks: refined break window behavior and quote handling.",
      "Safari restart flow: smoother prompt + helper.",
      "Blocked pages (Safari + Chrome extensions): updated styling and added quote rotation.",
    ],
  },
  {
    version: "1.2.1",
    date: "April 21, 2026",
    summary:
      "Chrome status honesty, working Launch-at-login, aligned statistics charts, human-readable durations.",
    changes: [
      "Fixed: Chrome extension status showed green while a block still force-quit Chrome and opened the \"fix extension\" page. The status dot now checks host permissions (not just heartbeat + incognito), so green means green.",
      "Fixed: Launch at login toggle did nothing. Now actually registers/unregisters FocusDragon via SMAppService and prompts for permission on first use.",
      "Statistics: horizontal bar charts now share a fixed-width y-axis label column, so bar origins line up with the axis label underneath.",
      "Dashboard: \"9m of focus\" is now \"9 minutes of focus\", with correct singular/plural and scaling all the way up to hours, days, months, years, and decades.",
      "Menu bar app name now reads \"FocusDragon\" (was falling back to a shorter default).",
    ],
  },
  {
    version: "1.2.0",
    date: "April 21, 2026",
    summary:
      "UI polish pass — onboarding gate, block-row redesign, directional transitions, in-app tips.",
    changes: [
      "Onboarding: Full Disk Access card now has a Refresh Status button, a red/green confirmation pill, and a greyed-out Next button until FDA is granted. A \"Skip for now\" escape hatch appears after one failed refresh.",
      "Block list rows redesigned — left accent bar in the block's chosen color, cleaner subtitle line (sites · apps · lock kind), pruned badge strip.",
      "Directional page transitions — moving down the sidebar slides from the right, moving up slides from the left.",
      "InfoTip popovers on Strictness toggles explain why each setting exists, not just what it does.",
      "Breaks chip row wraps onto a new line instead of squeezing into mid-word breaks (\"Allowan ce\", \"Pomodo ro\").",
      "Rubber-band scroll bounce disabled on pages that fit in the window.",
      "Settings → About now has a Check for Updates button (in addition to the one in the FocusDragon menu).",
      "Menu bar shows \"FocusDragon\" instead of truncating to \"Focus\".",
      "Daemon Refresh Status now actually refreshes (was caching the SMAppService result).",
      "chrome-extension://<self>/ URLs are now never blocked — fixes blocked.html redirecting to itself.",
      "Website: email capture modal on Download (tiny \"No thanks\" escape hatch preserved). Favicon white ring on Google results fixed.",
    ],
  },
  {
    version: "1.1.9",
    date: "April 21, 2026",
    summary:
      "Critical auto-update fix — Check for Updates… actually works now.",
    changes: [
      "Fixed: every previous release was shipped without the Sparkle appcast URL key (silently dropped by Xcode's auto-generated Info.plist), so Check for Updates errored out. SUFeedURL + SUPublicEDKey are now injected post-build",
      "Fixed: Settings → About showed a hardcoded \"1.0.0\" regardless of the running version. Now reads from the bundle so it always tracks the real version + build number",
      "One-time manual download required for existing 1.0.0–1.1.8 users (their installs literally can't auto-update themselves). From 1.2.0 onwards, Sparkle takes over",
    ],
  },
  {
    version: "1.1.8",
    date: "April 21, 2026",
    summary:
      "Bulletproof block-editor save — your typed name and URLs no longer get dropped silently.",
    changes: [
      "Fixed: creating a block while the name or website field was still focused could silently drop the edit because the TextField hadn't committed its value yet. All save-critical fields now force-commit synchronously before the handler runs",
      "Added: post-save verification that shows a visible error if a block doesn't land in the list, instead of closing the editor silently",
      "Pressing Return in the block-name field now saves",
    ],
  },
  {
    version: "1.1.7",
    date: "April 20, 2026",
    summary:
      "chrome://extensions is no longer blocked by default — extension reconfiguration works mid-block.",
    changes: [
      "New Advanced Mode toggle: \"Block chrome://extensions during blocks\" (default OFF). The browser's extensions page stays reachable during an active block unless you explicitly opt in",
      "Configurable grace period (default 60s, range 0–600s) gives you a window after a block starts to fix a broken extension before the page starts getting blocked",
      "Stale-state escape hatch: if the native messaging host is unreachable, chrome://extensions fails open instead of stranding you on the block page",
      "Fixes the \"block turned off but chrome://extensions still blocked\" bug by propagating block-state updates with a staleness timestamp",
      "Applies to Chrome, Edge, Brave, Opera, Vivaldi, Comet, and Firefox (about:addons, moz-extension://)",
    ],
  },
  {
    version: "1.1.6",
    date: "April 20, 2026",
    summary:
      "Critical onboarding fix — System Settings and Terminal are no longer force-quit outside of active locks.",
    changes: [
      "Fixed: System Settings, Terminal, and Activity Monitor were being killed even when no lock was active, preventing Full Disk Access from being granted during onboarding",
      "Fixed: \"Safari extension tampered\" alert was re-appearing every 3 seconds after dismissal — now debounces for 60 seconds after you dismiss it",
      "Fixed: missing Full Disk Access is now reported as \"grant FDA\" instead of a misleading \"extension tampered\" warning",
      "Enforcement (force-quit Safari on tamper) is now suppressed during onboarding so setup cannot be interrupted",
    ],
  },
  {
    version: "1.1.5",
    date: "April 20, 2026",
    summary:
      "Cold Turkey parity, Chrome extension, Date Lock, redesigned Block Editor.",
    changes: [
      "Cold Turkey feature parity — advanced URL matching, pre-made lists, all six break types, multi-user targeting",
      "Chrome extension + Extensions sidebar for cross-browser blocking",
      "Date Lock — lock a block until a specific future date",
      "Locked Block mode (replaces Frozen)",
      "Redesigned Block Editor with tabbed layout that fits on screen",
      "Dashboard and Statistics views",
      "Device-level blocks",
      "Launch-hang fix and tightened permission checks",
      "Sentry crash reporting + PostHog telemetry (opt-in)",
      "Native messaging host signed with Developer ID — no more recurring TCC prompts",
    ],
  },
  {
    version: "1.1.0",
    date: "April 13, 2026",
    summary:
      "Onboarding overhaul and Safari enforcement rewrite.",
    changes: [
      "Step-by-step onboarding tutorials for each permission",
      "Live permission status indicators",
      "Safari extension state now read directly from disk via Full Disk Access",
      "Fixed settings path resolution on first launch",
    ],
  },
  {
    version: "1.0.0",
    date: "April 11, 2026",
    summary:
      "The first public release of FocusDragon.",
    changes: [
      "6-layer blocking: DNS, app blocking, process monitoring, daemon, Safari extension, tamper resistance",
      "6 lock mechanisms to keep you committed",
      "Pomodoro timer with configurable intervals",
      "Dashboard with focus statistics and session history",
      "Block editor with emoji/color categories and inline app picker",
      "Safari extension for in-browser blocking",
      "Background daemon for enforcement when the app is closed",
      "Developer ID signed, Apple-notarized, universal binary",
    ],
  },
];

/* ── Helpers ──────────────────────────────────────────────── */

/* ── Page ─────────────────────────────────────────────────── */

export default function Changelog() {
  return (
    <div className="min-h-screen bg-grid">
      <SiteNav activePath="changelog" />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full px-4 py-2 mb-8 text-sm">
            <span className="text-[var(--muted)]">What&apos;s new in FocusDragon</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="gradient-text dragon-glow-text">Changelog</span>
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-xl mx-auto leading-relaxed">
            Every feature, fix, and improvement — version by version.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* vertical timeline line */}
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--card-border)] to-transparent hidden md:block" />

            <div className="space-y-12">
              {releases.map((release) => (
                <div key={release.version} className="relative md:pl-14">
                  {/* timeline dot */}
                  <div className="absolute left-2.5 top-2 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] hidden md:block" />

                  <div className="feature-card rounded-2xl bg-[var(--card-bg)] p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold">v{release.version}</h2>
                      {release.latest && (
                        <span className="ml-2 text-[11px] font-semibold uppercase tracking-wider bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 rounded-full px-2.5 py-0.5">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-4">
                      {release.date}
                    </p>
                    <p className="text-[var(--muted)] leading-relaxed mb-6">
                      {release.summary}
                    </p>

                    {/* Changes list */}
                    <ul className="space-y-2.5">
                      {release.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
                          <span className="text-sm text-[var(--foreground)]/80 leading-relaxed">
                            {change}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Always <span className="gradient-text">improving</span>
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
            FocusDragon updates automatically via Sparkle. Download once,
            stay up to date forever.
          </p>
          <Link
            href="/#download"
            className="download-btn inline-flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download FocusDragon
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.png"
              alt="FocusDragon"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="font-medium">FocusDragon</span>
            <span className="text-xs text-[var(--muted)]">v1.3.1</span>
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
