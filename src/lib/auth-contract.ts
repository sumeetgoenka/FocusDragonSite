export const APP_SCHEME = "focusdragon";
export const APP_DEEPLINK = `${APP_SCHEME}://auth/callback`;
export const SITE_ORIGIN = "https://www.focusdragon.app";

export const AGE_RANGES = [
  "under18",
  "range18to24",
  "range25to34",
  "range35to44",
  "range45plus",
] as const;
export type AgeRange = (typeof AGE_RANGES)[number];
