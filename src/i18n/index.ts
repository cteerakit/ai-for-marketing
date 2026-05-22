import { en } from "./en";
import { th } from "./th";
import type { Locale, LocaleStrings } from "./types";

export { WORKSHOP_NAME } from "./constants";
export { en } from "./en";
export { th } from "./th";
export { moduleNames } from "./modules";
export { MODULE_IDS } from "./types";
export type {
  Locale,
  LocaleStrings,
  ModuleId,
  ModuleTranslation,
  WorkshopCategory,
  WorkshopPromptItem,
  WorkshopSection
} from "./types";

export const locales: Record<Locale, LocaleStrings> = { en, th };

export const defaultLocale: Locale = "en";
