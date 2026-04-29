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
    version: "1.4.0",
    date: "April 29, 2026",
    latest: true,
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
