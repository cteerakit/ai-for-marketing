export type Locale = "en" | "th";

export const MODULE_IDS = [
  "welcome",
  "foundations",
  "personas-research",
  "copywriting-content",
  "campaign-strategy",
  "media-visuals",
  "ai-agents",
  "brand-analytics",
  "wrap-up"
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export interface WorkshopPromptItem {
  label?: string;
  text: string;
}

export interface WorkshopCategory {
  title: string;
  prompts: WorkshopPromptItem[];
}

export interface WorkshopSection {
  title: string;
  categories?: WorkshopCategory[];
  prompts?: WorkshopPromptItem[];
}

export interface ModuleTranslation {
  title: string;
  badge: string;
  description: string;
  workshops?: WorkshopSection[];
  prompts: string[];
}

export interface ToolTranslation {
  name: string;
  description: string;
  launch: string;
}

export interface LocaleStrings {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    workshop: string;
    appTitle: string;
    sidebarAria: string;
    navAria: string;
    selectModule: string;
    hideSidebar: string;
    showSidebar: string;
    switchToLight: string;
    switchToDark: string;
    language: string;
    english: string;
    thai: string;
    copy: string;
    copied: string;
    tryAgain: string;
    promptLabel: string;
    promptCustomize: string;
    copySsid: string;
    copyPassword: string;
    comingSoon: string;
  };
  modules: Record<ModuleId, ModuleTranslation>;
  welcome: {
    wifiTitle: string;
    networkSsid: string;
    password: string;
    essentialTools: string;
    gemini: ToolTranslation;
    chatgpt: ToolTranslation;
    claude: ToolTranslation;
  };
  personasResearch: {
    essentialTool: string;
    notebooklm: ToolTranslation;
  };
  wrapUp: {
    slidesTitle: string;
    slidesDescription: string;
    openSlides: string;
    feedbackTitle: string;
    feedbackDescription: string;
    feedbackButton: string;
    formComingSoon: string;
    discordTitle: string;
    discordDescription: string;
    discordButton: string;
    discordComingSoon: string;
  };
}
