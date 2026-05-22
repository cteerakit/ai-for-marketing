import type { WorkshopPromptItem, WorkshopSection } from "../i18n/types";

export function getWorkshopPrompt(
  workshop: WorkshopSection,
  index: number
): WorkshopPromptItem | undefined {
  if (workshop.prompts) return workshop.prompts[index];

  if (workshop.categories) {
    let i = 0;
    for (const category of workshop.categories) {
      for (const prompt of category.prompts) {
        if (i === index) return prompt;
        i++;
      }
    }
  }

  return undefined;
}
