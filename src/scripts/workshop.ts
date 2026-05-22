import { defaultLocale, locales, MODULE_IDS, moduleNames, WORKSHOP_NAME } from "../i18n";
import type { Locale, LocaleStrings, ModuleId } from "../i18n";
import {
  getPlaceholderDefault,
  getPlaceholders,
  getPromptValues,
  getResolvedPromptFromCard,
  isNumericPlaceholder,
  resolvePrompt
} from "../lib/prompt-template";
import { getWorkshopPrompt } from "../lib/workshop-prompts";

const STORAGE_KEY = "locale";
const MODULE_STORAGE_KEY = "activeModule";

const moduleIdSet = new Set<string>(MODULE_IDS);

function getLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "th" ? "th" : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

function setLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Locale still switches for this session if storage is unavailable.
  }
}

function getStoredModuleId(): ModuleId | null {
  try {
    const stored = localStorage.getItem(MODULE_STORAGE_KEY);
    return stored && moduleIdSet.has(stored) ? (stored as ModuleId) : null;
  } catch {
    return null;
  }
}

function setStoredModuleId(moduleId: ModuleId) {
  try {
    localStorage.setItem(MODULE_STORAGE_KEY, moduleId);
  } catch {
    // Module still switches for this session if storage is unavailable.
  }
}

function getActiveModuleId(): ModuleId {
  const stored = getStoredModuleId();
  if (stored) return stored;

  const activeTab = document.querySelector('[data-module-tab][aria-selected="true"]');
  const moduleId = activeTab?.getAttribute("data-module-tab");
  return (moduleId as ModuleId) || "welcome";
}

function applyLocale(locale: Locale) {
  const t = locales[locale];
  document.documentElement.lang = locale;
  document.title = WORKSHOP_NAME;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", t.meta.description);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key || key === "ui.appTitle") return;
    const value = resolveKey(t, key);
    if (typeof value === "string") el.textContent = value;
  });

  const appTitleEl = document.querySelector('[data-i18n="ui.appTitle"]');
  if (appTitleEl) appTitleEl.textContent = WORKSHOP_NAME;

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (!key) return;
    const value = resolveKey(t, key);
    if (typeof value === "string") el.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-module-tab]").forEach((tab) => {
    const moduleId = tab.getAttribute("data-module-tab") as ModuleId;
    const name = moduleNames[moduleId];
    if (!name) return;

    const titleSpan = tab.querySelector("[data-tab-title]");
    if (titleSpan) titleSpan.textContent = name.title;

    const numberSpan = tab.querySelector("[data-tab-number]");
    if (numberSpan && name.number !== undefined) numberSpan.textContent = String(name.number);

    tab.setAttribute("data-module-title", name.title);
    tab.setAttribute("data-module-number", name.badge);
  });

  document.querySelectorAll("[data-module-panel]").forEach((panel) => {
    const moduleId = panel.getAttribute("data-module-panel") as ModuleId;
    const mod = t.modules[moduleId];
    const name = moduleNames[moduleId];
    if (!mod || !name) return;

    const desc = panel.querySelector("[data-panel-description]");
    if (desc) desc.textContent = mod.description;

    panel.setAttribute("aria-label", name.title);

    if (mod.workshops) {
      panel.querySelectorAll("[data-workshop]").forEach((workshopEl) => {
        if (!(workshopEl instanceof HTMLElement)) return;

        const workshopIndex = Number(workshopEl.getAttribute("data-workshop-index"));
        const workshop = mod.workshops?.[workshopIndex];
        if (!workshop) return;

        const titleEl = workshopEl.querySelector("[data-workshop-title]");
        if (titleEl) titleEl.textContent = workshop.title;

        workshopEl.querySelectorAll("[data-prompt-index]").forEach((card) => {
          if (!(card instanceof HTMLElement)) return;

          const index = Number(card.getAttribute("data-prompt-index"));
          const promptItem = getWorkshopPrompt(workshop, index);
          if (!promptItem) return;

          const label = card.querySelector("[data-prompt-label]");
          if (label) {
            label.textContent = promptItem.label ?? `${t.ui.promptLabel} ${index + 1}`;
          }

          card.setAttribute("data-prompt-template", promptItem.text);

          const code = card.querySelector("[data-prompt-code]");
          if (code) code.textContent = promptItem.text;
        });
      });
      return;
    }

    panel.querySelectorAll("[data-prompt-index]").forEach((card) => {
      if (!(card instanceof HTMLElement)) return;

      const index = Number(card.getAttribute("data-prompt-index"));
      const prompt = mod.prompts[index];
      if (prompt === undefined) return;

      const savedValues = getPromptValues(card);
      const label = card.querySelector("[data-prompt-label]");

      if (label) label.textContent = `${t.ui.promptLabel} ${index + 1}`;

      card.setAttribute("data-prompt-template", prompt);
      renderPromptFields(card, prompt, t, savedValues);
      updatePromptPreview(card);
    });
  });

  const mobileSelect = document.querySelector("#mobile-module-select");
  if (mobileSelect instanceof HTMLSelectElement) {
    Array.from(mobileSelect.options).forEach((option) => {
      const moduleId = option.value as ModuleId;
      const name = moduleNames[moduleId];
      if (name) option.textContent = name.title;
    });
  }

  languageButtons.forEach((button) => {
    const buttonLocale = button.getAttribute("data-locale") as Locale;
    const isActive = buttonLocale === locale;
    button.classList.toggle("bg-secondary", isActive);
    button.classList.toggle("text-secondary-foreground", isActive);
    button.classList.toggle("shadow-sm", isActive);
    button.classList.toggle("text-muted-foreground", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  activateModule(getActiveModuleId());

  const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
  themeToggleButtons.forEach((button) => {
    button.setAttribute("aria-label", theme === "dark" ? t.ui.switchToLight : t.ui.switchToDark);
  });

  sidebarToggleButtons.forEach((button) => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-label", expanded ? t.ui.hideSidebar : t.ui.showSidebar);
  });
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function updatePromptPreview(card: HTMLElement) {
  const template = card.getAttribute("data-prompt-template") ?? "";
  const code = card.querySelector("[data-prompt-code]");
  if (code) code.textContent = resolvePrompt(template, getPromptValues(card));
}

function renderPromptFields(
  card: HTMLElement,
  template: string,
  t: LocaleStrings,
  savedValues: Record<string, string> = {}
) {
  const placeholders = getPlaceholders(template);
  let container = card.querySelector<HTMLElement>("[data-prompt-fields]");

  if (placeholders.length === 0) {
    container?.remove();
    return;
  }

  const fieldsHtml = `
    <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground" data-prompt-customize-label>${escapeHtml(t.ui.promptCustomize)}</p>
    ${placeholders
      .map((placeholder) => {
        const isCount = isNumericPlaceholder(placeholder);
        const defaultValue = getPlaceholderDefault(placeholder);
        const value = savedValues[placeholder] ?? defaultValue;

        return `
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-foreground">${escapeHtml(placeholder)}</label>
        <input
          type="${isCount ? "number" : "text"}"
          ${isCount ? 'min="1"' : ""}
          data-prompt-field
          data-placeholder="${escapeAttr(placeholder)}"
          placeholder="${escapeAttr(placeholder)}"
          value="${escapeAttr(value)}"
          class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/40"
        />
      </div>`;
      })
      .join("")}
  `;

  if (!container) {
    container = document.createElement("div");
    container.className = "mt-4 space-y-3 rounded-md border border-border bg-muted/30 p-4";
    container.setAttribute("data-prompt-fields", "");
    card.querySelector("[data-prompt-preview]")?.after(container);
  }

  container.innerHTML = fieldsHtml;
  bindPromptFieldInputs(card);
}

function bindPromptFieldInputs(card: HTMLElement) {
  card.querySelectorAll("[data-prompt-field]").forEach((input) => {
    if (!(input instanceof HTMLInputElement)) return;
    input.addEventListener("input", () => updatePromptPreview(card));
  });
}

function resolveKey(obj: LocaleStrings, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

const tabs = Array.from(document.querySelectorAll("[data-module-tab]"));
const panels = Array.from(document.querySelectorAll("[data-module-panel]"));
const mobileSelect = document.querySelector("#mobile-module-select");
const themeToggleButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));
const languageButtons = Array.from(document.querySelectorAll("[data-locale-toggle]"));
const sidebar = document.querySelector("[data-sidebar]");
const sidebarOverlay = document.querySelector("[data-sidebar-overlay]");
const sidebarToggleButtons = Array.from(document.querySelectorAll("[data-sidebar-toggle]"));
let isSidebarOpen = true;
let currentLocale = getLocale();

function getTheme() {
  try {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
  } catch {
    return "dark";
  }
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Theme still switches for this session if storage is unavailable.
  }

  const t = locales[currentLocale];
  themeToggleButtons.forEach((button) => {
    button.setAttribute("aria-label", theme === "dark" ? t.ui.switchToLight : t.ui.switchToDark);
  });
}

function activateModule(moduleId: ModuleId) {
  setStoredModuleId(moduleId);

  let activeTitle = "";
  let activeNumber = "";

  tabs.forEach((tab) => {
    const isActive = tab.getAttribute("data-module-tab") === moduleId;
    tab.classList.toggle("bg-secondary", isActive);
    tab.classList.toggle("text-secondary-foreground", isActive);
    tab.classList.toggle("shadow-sm", isActive);
    tab.classList.toggle("text-muted-foreground", !isActive);
    tab.classList.toggle("hover:bg-accent", !isActive);
    tab.classList.toggle("hover:text-accent-foreground", !isActive);
    tab.setAttribute("aria-selected", String(isActive));

    if (isActive) {
      activeTitle = tab.getAttribute("data-module-title") || "";
      activeNumber = tab.getAttribute("data-module-number") || "";
    }
  });

  panels.forEach((panel) => {
    const isActive = panel.getAttribute("data-module-panel") === moduleId;
    panel.classList.toggle("hidden", !isActive);
    panel.classList.toggle("block", isActive);
  });

  if (mobileSelect instanceof HTMLSelectElement && mobileSelect.value !== moduleId) {
    mobileSelect.value = moduleId;
  }

  const badgeEl = document.querySelector("#active-module-badge");
  const titleEl = document.querySelector("#active-module-title");
  if (badgeEl) badgeEl.textContent = activeNumber;
  if (titleEl) titleEl.textContent = activeTitle;
}

function isDesktopViewport() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function applySidebarState(open: boolean) {
  isSidebarOpen = open;
  const t = locales[currentLocale];

  if (sidebar instanceof HTMLElement) {
    sidebar.classList.toggle("-translate-x-full", !open);
    sidebar.classList.toggle("md:hidden", !open);
    sidebar.classList.toggle("md:flex", open);
    sidebar.setAttribute("aria-hidden", String(!open));
  }

  if (sidebarOverlay instanceof HTMLElement) {
    sidebarOverlay.classList.toggle("hidden", !open || isDesktopViewport());
  }

  sidebarToggleButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? t.ui.hideSidebar : t.ui.showSidebar);
  });
}

sidebarToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applySidebarState(!isSidebarOpen);
  });
});

sidebarOverlay?.addEventListener("click", () => {
  applySidebarState(false);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isSidebarOpen && !isDesktopViewport()) {
    applySidebarState(false);
  }
});

window.addEventListener("resize", () => {
  applySidebarState(isDesktopViewport() ? isSidebarOpen : false);
});

applySidebarState(isDesktopViewport());
applyTheme(getTheme() as "light" | "dark");
applyLocale(currentLocale);

themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const locale = button.getAttribute("data-locale") as Locale;
    if (!locale || locale === currentLocale) return;
    currentLocale = locale;
    setLocale(locale);
    applyLocale(locale);
  });
});

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some browser contexts expose Clipboard API but reject writes without a user grant.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const copied = document.execCommand("copy");
    if (!copied) throw new Error("Copy command was not accepted.");
  } finally {
    document.body.removeChild(textArea);
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const moduleId = tab.getAttribute("data-module-tab") as ModuleId;
    if (moduleId) activateModule(moduleId);
    if (!isDesktopViewport()) applySidebarState(false);
  });
});

mobileSelect?.addEventListener("change", (event) => {
  const target = event.target;
  if (target instanceof HTMLSelectElement) activateModule(target.value as ModuleId);
});

function setWorkshopOpen(workshop: HTMLElement, open: boolean) {
  const toggle = workshop.querySelector("[data-workshop-toggle]");
  const content = workshop.querySelector("[data-workshop-content]");
  const chevron = workshop.querySelector("[data-workshop-chevron]");

  if (!(toggle instanceof HTMLButtonElement) || !(content instanceof HTMLElement)) return;

  content.classList.toggle("hidden", !open);
  toggle.setAttribute("aria-expanded", String(open));
  chevron?.classList.toggle("-rotate-90", !open);
}

document.querySelectorAll("[data-workshop]").forEach((workshop) => {
  if (!(workshop instanceof HTMLElement)) return;

  const toggle = workshop.querySelector("[data-workshop-toggle]");
  if (!(toggle instanceof HTMLButtonElement)) return;

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setWorkshopOpen(workshop, open);
  });
});

document.querySelectorAll("[data-copy-prompt], [data-copy-text]").forEach((button) => {
  button.addEventListener("click", async () => {
    if (!(button instanceof HTMLButtonElement)) return;

    const text = button.hasAttribute("data-copy-prompt")
      ? getResolvedPromptFromCard(button)
      : (button.getAttribute("data-copy-text") ?? "");
    const isIconOnly = !button.classList.contains("copy-button");
    const initialHTML = button.innerHTML;
    const t = locales[currentLocale];

    try {
      await copyText(text);
      if (isIconOnly) {
        button.innerHTML = `<svg class="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      } else {
        button.textContent = t.ui.copied;
      }
      button.disabled = true;
      window.setTimeout(() => {
        button.innerHTML = initialHTML;
        button.disabled = false;
      }, 2000);
    } catch {
      if (isIconOnly) {
        button.innerHTML = `<svg class="h-4 w-4 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      } else {
        button.textContent = t.ui.tryAgain;
      }
      window.setTimeout(() => {
        button.innerHTML = initialHTML;
      }, 2000);
    }
  });
});
