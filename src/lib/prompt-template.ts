const PLACEHOLDER_PATTERN = /\[([^\]]+)\]/g;

const PLACEHOLDER_DEFAULTS: Record<string, string> = {
  "จำนวนแบบ": "3",
  "จำนวนพาดหัว": "5",
  "จำนวนบรรทัด": "3",
  "จำนวนข้อ": "3"
};

export function getPlaceholderDefault(placeholder: string): string {
  return PLACEHOLDER_DEFAULTS[placeholder] ?? "";
}

export function isNumericPlaceholder(placeholder: string): boolean {
  return placeholder in PLACEHOLDER_DEFAULTS;
}

export function getPlaceholders(template: string): string[] {
  const found = [...template.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[1]);
  return [...new Set(found)];
}

export function resolvePrompt(
  template: string,
  values: Record<string, string>
): string {
  let result = template;

  for (const placeholder of getPlaceholders(template)) {
    const trimmed = (values[placeholder] ?? "").trim();
    const replacement = trimmed || getPlaceholderDefault(placeholder);
    if (!replacement) continue;
    result = result.split(`[${placeholder}]`).join(replacement);
  }

  return result;
}

export function getPromptValues(card: ParentNode): Record<string, string> {
  const values: Record<string, string> = {};

  card.querySelectorAll<HTMLInputElement>("[data-prompt-field]").forEach((input) => {
    const placeholder = input.getAttribute("data-placeholder");
    if (placeholder) values[placeholder] = input.value;
  });

  return values;
}

export function getPromptCard(element: ParentNode): HTMLElement | null {
  if (element instanceof HTMLElement && element.hasAttribute("data-prompt-template")) {
    return element;
  }

  return (element as Element).closest<HTMLElement>("[data-prompt-template]");
}

export function getResolvedPromptFromCard(card: ParentNode): string {
  const article = getPromptCard(card);
  const template = article?.getAttribute("data-prompt-template") ?? "";
  if (!template || !article) return "";

  if (article.hasAttribute("data-prompt-static")) return template;

  return resolvePrompt(template, getPromptValues(article));
}
