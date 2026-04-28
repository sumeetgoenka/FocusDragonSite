import { en } from "./en";
import type { Dict } from "../dictionary";

// TODO(i18n): vi translations pending. Falls back to English source so the
// type contract is satisfied and the build passes. Replace with a fully
// translated dictionary in a follow-up agent task.
export const vi: Dict = en;
