import type { ModuleId } from "./types";

export const moduleNames: Record<ModuleId, { title: string; badge: string; number?: number }> = {
  welcome: { title: "Welcome & Prep", badge: "Welcome" },
  foundations: { title: "The AI Foundation", badge: "Module 0", number: 0 },
  "personas-research": { title: "Identity & The Brand Gem", badge: "Module 1", number: 1 },
  "copywriting-content": { title: "Research Revolution", badge: "Module 2", number: 2 },
  "campaign-strategy": { title: "The Content Multiplier", badge: "Module 3", number: 3 },
  "media-visuals": { title: "Interactive Data Science", badge: "Module 4", number: 4 },
  "ai-agents": { title: "Rollout & Implementation", badge: "Module 5", number: 5 },
  "brand-analytics": { title: "Beyond the Basics", badge: "Module 6", number: 6 },
  "wrap-up": { title: "Wrap Up & Next Steps", badge: "Wrap Up" }
};
