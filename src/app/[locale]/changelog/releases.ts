/// Release notes are kept in English (technical content). The chrome
/// around them — page title, "latest" badge text, CTAs — is translated.
export interface Release {
  version: string;
  date: string;
  latest?: boolean;
  summary: string;
  changes: string[];
}

export const releases: Release[] = [
  {
    version: "1.4.4",
    date: "May 1, 2026",
    latest: true,
    summary: "Block Editor redesign — wider sheet, scope navigator, severity-first enforcement, and bigger consequence cards for device blocks.",
    changes: [
      "Redesigned: the entire Block Editor sheet. Wider 880×720 layout with a new identity bar (big editable name, gradient icon tile, kind-aware subtitle) and segmented kind tabs with an accent underline for the active mode.",
      "Redesigned: Website & App blocks. The top tab strip is now a left-rail scope navigator (Websites · Exceptions · Apps · Advanced) with live counts, so you always see the shape of your block at a glance.",
      "Redesigned: Enforcement. The 10-tile lock grid is now a 5-rung strength selector (None → Soft → Medium → Hard → Iron) — pick the severity first, then the specific lock type. Tiles show what each lock does in a sub-line.",
      "Redesigned: Device blocks. New warning banner up top, plus three large consequence cards (Lock Screen / Sign Out / Shut Down) with mini-mockups of the resulting Mac state instead of dense rows.",
      "Redesigned: AI-Powered blocks. The brief is now the hero — bigger textarea, gradient icon medallion, one-tap suggestion chips for common focus modes, and a privacy footer reminding you that page bodies stay local.",
      "Refined: footer action bar. New blocks show a \"not yet saved\" status; existing blocks get a quieter outlined Delete instead of a red button.",
    ],
  },
  {
    version: "1.4.3",
    date: "April 30, 2026",
    summary: "AI drift enforcement is now bulletproof. Nudge is the new default; Hard adds a 5-minute cooldown that resets on every reopening attempt.",
    changes: [
      "Changed: Nudge is the new default enforcement level for new blocks. AI-detected drift now force-quits the offending app and posts an \"I was on-task\" override notification. Tap to add the URL or app to a per-block allow-list for the rest of the session — useful when AI gets a math-shorts video confused with TikTok-style content.",
      "New: Hard mode adds a 5-minute bundleID cooldown after every AI force-quit. Reopening the locked app within the cooldown triggers an instant re-kill (no LLM call needed) and resets the timer — persistent reopening makes the lockout longer, not shorter.",
      "Migration: existing blocks keep their saved enforcement level. Nudge is the default for new blocks created from 1.4.3 onward.",
    ],
  },
  {
    version: "1.4.2",
    date: "April 30, 2026",
    summary: "Critical: the background service no longer asks for re-approval after every Sparkle update.",
    changes: [
      "Fixed (critical): every autoupdate was wiping the user's \"Allow in Login Items\" approval for the background service, forcing a System Settings round-trip after each release. The post-update re-registration now preserves your approval — Sparkle updates land silently and your blocks keep working without intervention.",
    ],
  },
  {
    version: "1.4.1",
    date: "April 29, 2026",
    summary: "Soft sign-in: open the app and configure blocks without an account. Sign in is only required to start a block.",
    changes: [
      "Changed: sign-in is now soft. The app launches straight into your dashboard — no gate. A \"Sign in\" pill in the top bar opens sign-in any time.",
      "New: starting a block prompts for sign-in if you haven't yet, so your blocking history attaches to a stable account. Browsing and configuring blocks is fully free without one.",
      "Redesigned: the in-app sign-in screen is now dragon-themed with a breathing hero, trust strip, and warmer copy.",
      "Redesigned: the website sign-in flow (start, profile completion, deep-link launcher) and the admin login share the same dragon visual language.",
      "Removed: the \"I'm 16 or older\" checkbox during sign-up.",
      "Fixed: the sign-in flow on the website now correctly persists the session cookie when finishing OAuth (a Next.js 15 server-component-can't-write-cookies trap).",
    ],
  },
  {
    version: "1.4.0",
    date: "April 29, 2026",
    summary: "Accounts arrive in FocusDragon. Sign in with Google or email — your blocks, settings, and stats stay on your Mac.",
    changes: [
      "New: forced sign-in on launch via your browser. Click \"Sign in with browser\", complete Google or email magic-link in your browser, then the app picks up the sign-in automatically.",
      "New: account profile (display name + optional age range) collected once on first sign-in. Used for the dashboard greeting and to plan future iOS / sync features.",
      "New: Settings → Account section with Sign out and Delete account. Sign out keeps every block, stat, and setting intact on this Mac — only the session is cleared.",
      "Migration: existing 1.3.x users keep all local data on first sign-in. Nothing is uploaded or deleted; the account simply attaches to the data already on disk.",
      "Foundation for what's next: cross-device sync, the iOS companion, and paid tiers all hang off this account model.",
    ],
  },
  {
    version: "1.3.9",
    date: "April 29, 2026",
    summary: "Stop presenting the daemon-permissions wizard after every Sparkle update.",
    changes: [
      "Fixed: after every autoupdate, FocusDragon was auto-presenting the 4-step \"Welcome / Permissions / Full Disk Access / Done\" daemon-setup wizard whenever macOS briefly flipped the background service to \"needs re-approval.\" That looked exactly like onboarding restarting and was the real reason long-time users kept reporting the old onboarding came back. The wizard no longer auto-mounts; if the daemon genuinely needs re-approval, you'll see a small dismissible banner with a one-click Open Settings button instead.",
    ],
  },
  {
    version: "1.3.8",
    date: "April 29, 2026",
    summary: "Critical autoupdate fix, plus reliability fixes for Safari notifications and onboarding state.",
    changes: [
      "Fixed (critical): a cross-host redirect on the appcast was silently breaking Sparkle autoupdate for many users — they were frozen on whatever version they originally installed. Updates now reach every user on the next poll.",
      "Fixed: Safari extension \"no longer responding\" notification no longer fires when nothing is being enforced; added a per-browser cooldown so Safari relaunches don't trigger spurious notifications during the brief stale-heartbeat window.",
      "Fixed: onboarding could restart after an update if the app was interrupted during the Beat 6 catch animation — completion is now persisted the moment you commit, before the celebration plays.",
      "Removed: About page (the home page already covers it).",
    ],
  },
  {
    version: "1.3.7",
    date: "April 28, 2026",
    summary: "The cinematic dragon intro now plays on every launch, not just the first run.",
    changes: [
      "Intro: the dragon-takes-flight intro now plays every time you open FocusDragon. Click anywhere or press Esc / Return / Space to skip.",
    ],
  },
  {
    version: "1.3.6",
    date: "April 28, 2026",
    summary: "Cinematic intro before first-run onboarding, a Stop-all-blocks bulk action, and a data-loss fix in the block editor.",
    changes: [
      "Onboarding: a cinematic dragon-takes-flight intro now plays once before Beat 1, then never again.",
      "Blocker: new \"Stop all blocks\" item in the menu — routes through per-block stop logic so locks are respected.",
      "Fixed: block editor used to wipe website list when toggling kind; now preserves every field across kind switches.",
      "Fixed: Sparkle auto-update prompt no longer overlays onboarding splash on first launch.",
    ],
  },
  {
    version: "1.3.5",
    date: "April 28, 2026",
    summary: "Onboarding got real artwork and a real hatching video.",
    changes: [
      "Onboarding: bundled a real hatching video for Beat 6 (HEVC-with-alpha, colour-corrected).",
      "Onboarding: new focusdragon.png hero image with the catch flow merged into the same screen.",
      "Onboarding: real Safari and Chrome icons on Beat 5 with soft orange glow.",
      "Onboarding: replay no longer appends duplicate preset blocks.",
    ],
  },
  {
    version: "1.3.4",
    date: "April 27, 2026",
    summary: "Onboarding polish and a fix for the false \"permission missing\" page Chrome kept opening.",
    changes: [
      "Fixed: Chrome stopped opening a fix-no-block page on every block-start despite a healthy extension.",
      "Onboarding: warmer egg gradient replaces the wireframe outline.",
      "Onboarding: \"Grant\" on Voice scale now opens System Settings → Notifications and polls for the toggle.",
      "Onboarding: enemy preset block now ships enabled so the test fires the block-page.",
    ],
  },
];
