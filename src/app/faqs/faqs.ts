export type FaqCategory =
  | "Getting Started"
  | "Blocking"
  | "Safari Extension"
  | "Permissions"
  | "Troubleshooting"
  | "Uninstall";

export type FaqAnswerBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language?: string; text: string }
  | { type: "callout"; tone: "info" | "warning"; text: string };

export interface Faq {
  slug: string;
  question: string;
  category: FaqCategory;
  short: string;
  icon: string;
  keywords?: string[];
  /**
   * Marks the FAQ as using a custom route. The generic [slug] page will
   * redirect readers to the matching route instead of rendering answer blocks.
   */
  custom?: boolean;
  answer?: FaqAnswerBlock[];
}

export const faqs: Faq[] = [
  {
    slug: "what-is-focusdragon",
    question: "What is FocusDragon?",
    category: "Getting Started",
    icon: "🐉",
    short: "A free, open-source macOS blocker for sites and apps.",
    keywords: ["about", "overview", "product"],
    answer: [
      {
        type: "paragraph",
        text: "FocusDragon is a free, open-source distraction blocker for macOS. It blocks websites and applications using six layers of protection so you can actually get work done.",
      },
      {
        type: "heading",
        text: "What makes it different?",
      },
      {
        type: "list",
        items: [
          "System-level enforcement via a background service",
          "Hardened lock types (timer, random text, restart, breakable, frozen)",
          "Safari extension for reliable in-browser blocking",
          "Kills force-quit-resistant browsers that would bypass Safari",
          "Completely free — no trials, no upsells, no accounts",
        ],
      },
    ],
  },
  {
    slug: "is-focusdragon-free",
    question: "Is FocusDragon really free?",
    category: "Getting Started",
    icon: "💸",
    short: "Yes. No subscription, no account, no upsells.",
    keywords: ["price", "free", "cost", "pay"],
    answer: [
      {
        type: "paragraph",
        text: "Yes. FocusDragon is 100% free and open source. There is no paid tier, no free trial that converts, and no account required.",
      },
      {
        type: "paragraph",
        text: "If you want to support the project, star us on GitHub or share it with a friend who needs to touch grass.",
      },
    ],
  },
  {
    slug: "how-to-create-a-block",
    question: "How do I create my first block?",
    category: "Getting Started",
    icon: "🎯",
    short: "Click \"New Block\", add sites or apps, pick a lock type, start.",
    keywords: ["first block", "create", "start", "setup"],
    answer: [
      {
        type: "heading",
        text: "Step-by-step",
      },
      {
        type: "list",
        items: [
          "Open FocusDragon and click \"New Block\" in the top-right.",
          "Give the block a name (required).",
          "Under Blocked Items, add websites or applications.",
          "Under Enforcement, pick a lock type. \"No Lock\" lets you disable anytime; \"Timer\" or \"Random Text\" makes it harder to bail.",
          "Click Create Block, then hit Start on the row.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "First time? Start with a short timer block so you get a feel for how it enforces. You can always create harder ones later.",
      },
    ],
  },
  {
    slug: "safari-extension-setup",
    question: "How do I enable the Safari extension?",
    category: "Safari Extension",
    icon: "🧩",
    short: "Open Safari → Settings → Extensions → check FocusDragon.",
    keywords: ["safari", "extension", "enable"],
    answer: [
      {
        type: "heading",
        text: "Enabling the extension",
      },
      {
        type: "list",
        items: [
          "Open Safari.",
          "Safari menu → Settings → Extensions.",
          "Check the box next to FocusDragon.",
          "Click \"Edit Websites\" and set \"All Websites\" to \"Allow\".",
          "If you browse in Private Browsing, tick the \"Allow in Private Browsing\" option too.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Without site access, the extension cannot block anything. Make sure \"All Websites\" is set to \"Allow\".",
      },
    ],
  },
  {
    slug: "why-only-safari",
    question: "Why does FocusDragon only support Safari?",
    category: "Blocking",
    icon: "🧭",
    short: "Chrome, Firefox, and Brave will be force-quit during blocks.",
    keywords: ["chrome", "firefox", "brave", "arc", "browser"],
    answer: [
      {
        type: "paragraph",
        text: "Website blocking is fully active in Safari via the FocusDragon extension. Other browsers (Chrome, Firefox, Brave, Arc, Tor, etc.) get force-quit while a block is active — that's intentional. Allowing them would let you sneak past the Safari extension.",
      },
      {
        type: "paragraph",
        text: "Support for Chromium-based browsers is on the roadmap. In the meantime, if you rely on Chrome for work, add it as an exception, but know that defeats the purpose of a distraction block.",
      },
    ],
  },
  {
    slug: "permissions-needed",
    question: "What permissions does FocusDragon need?",
    category: "Permissions",
    icon: "🔐",
    short: "Background service, Full Disk Access, and the Safari extension.",
    keywords: ["permissions", "access", "privacy"],
    answer: [
      {
        type: "list",
        items: [
          "Background Service — keeps blocks active even when the app is closed.",
          "Full Disk Access — lets the service modify /etc/hosts to block domains.",
          "Safari Extension — blocks sites inside Safari at the browser level.",
        ],
      },
      {
        type: "paragraph",
        text: "FocusDragon does not collect, transmit, or store any data. Everything runs locally on your Mac.",
      },
    ],
  },
  {
    slug: "block-not-working",
    question: "My block isn't working — what do I check?",
    category: "Troubleshooting",
    icon: "🛠️",
    short: "Daemon running, Full Disk Access, and Safari extension enabled.",
    keywords: ["broken", "fix", "help", "not working"],
    answer: [
      {
        type: "heading",
        text: "The usual suspects",
      },
      {
        type: "list",
        items: [
          "Open Settings → Blocking → Background Service. It should say \"Running\".",
          "If the service isn't running, click Set Up Permissions and follow the wizard.",
          "Check that Full Disk Access is granted to the FocusDragon background service in System Settings → Privacy & Security → Full Disk Access.",
          "Open Safari → Settings → Extensions and confirm FocusDragon is enabled with access to All Websites.",
          "Try toggling the block Off and On again to re-apply rules.",
        ],
      },
    ],
  },
  {
    slug: "random-text-lock",
    question: "What is a Random Text lock?",
    category: "Blocking",
    icon: "🔠",
    short: "You must manually type a long random string to unlock.",
    keywords: ["random text", "lock", "hardcore"],
    answer: [
      {
        type: "paragraph",
        text: "Random Text is a hardcore lock. When you try to disable the block, you'll have to type a long random string character-by-character (no copy-paste). It adds friction so your gremlin brain can't impulse-unlock.",
      },
      {
        type: "paragraph",
        text: "Use this when you've already failed a softer block and need something that actually hurts to bypass.",
      },
    ],
  },
  {
    slug: "data-privacy",
    question: "Does FocusDragon collect any data?",
    category: "Getting Started",
    icon: "🛡️",
    short: "No. Everything stays on your Mac. Zero telemetry.",
    keywords: ["privacy", "data", "telemetry", "tracking"],
    answer: [
      {
        type: "paragraph",
        text: "No. FocusDragon does not collect telemetry, analytics, or any personal data. No accounts, no cloud sync, no phone-home. Everything — your block lists, settings, statistics — lives on your Mac.",
      },
      {
        type: "paragraph",
        text: "The project is open source on GitHub, so you can verify this yourself.",
      },
    ],
  },
  {
    slug: "supported-macos",
    question: "Which macOS versions are supported?",
    category: "Getting Started",
    icon: "🖥️",
    short: "macOS 13 Ventura or later (Intel & Apple Silicon).",
    keywords: ["requirements", "macos", "system"],
    answer: [
      {
        type: "paragraph",
        text: "FocusDragon requires macOS 13 Ventura or later. It's a universal binary, so it runs natively on both Apple Silicon and Intel Macs.",
      },
    ],
  },
  {
    slug: "i-made-a-fatal-mistake",
    question: "I made a fatal mistake. How do I remove FocusDragon from my Mac?",
    category: "Uninstall",
    icon: "⚠️",
    short: "Uninstall instructions + terminal commands. 60s gentle pause.",
    keywords: ["uninstall", "remove", "delete", "kill"],
    custom: true,
  },
];

export const faqCategories: FaqCategory[] = [
  "Getting Started",
  "Blocking",
  "Safari Extension",
  "Permissions",
  "Troubleshooting",
  "Uninstall",
];
