import { releases } from "@/app/[locale]/changelog/releases";

/// The version of the macOS app currently being shipped.
///
/// Derived from the changelog's top entry — updating the changelog is a
/// required step in every release (Step 4 of the ship workflow), so
/// pulling the version from there makes drift impossible. There must be
/// **no other place in the site repo that hardcodes a version string**.
///
/// Why this exists: 2026-05-03 we caught a real user downloading v1.4.3
/// 11 hours after we'd shipped 1.4.4+, because five separate files
/// (homepage, /upgrade, /not-found, footer, simple landing) had
/// independently hardcoded `APP_VERSION = "1.4.3"` and the previous
/// ship-workflow grep only caught the visible "v1.4.3" badges. This
/// module is the fix: there is now exactly one place for the version,
/// and the ship workflow only has to update one file (the changelog).

export const APP_VERSION: string = releases[0].version;

/// Same value with a leading "v" — matches the badges in SiteNav,
/// SiteFooter, etc. that historically used the v-prefixed form.
export const APP_VERSION_TAG: string = `v${APP_VERSION}`;
