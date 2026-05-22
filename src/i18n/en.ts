import { WORKSHOP_NAME } from "./constants";
import { foundationsWorkshops } from "./foundations-workshops";
import { moduleNames } from "./modules";
import { personasResearchWorkshops } from "./personas-research-workshops";
import type { LocaleStrings } from "./types";

export const en: LocaleStrings = {
  meta: {
    title: WORKSHOP_NAME,
    description: "Generative AI for Marketing Transformation workshop companion app"
  },
  ui: {
    workshop: "Workshop",
    appTitle: WORKSHOP_NAME,
    sidebarAria: "Workshop sidebar",
    navAria: "Workshop modules",
    selectModule: "Select module",
    hideSidebar: "Hide sidebar",
    showSidebar: "Show sidebar",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    language: "Language",
    english: "English",
    thai: "ไทย",
    copy: "Copy",
    copied: "Copied!",
    tryAgain: "Try again",
    promptLabel: "Prompt",
    promptCustomize: "Customize prompt",
    copySsid: "Copy SSID",
    copyPassword: "Copy Password",
    comingSoon: "Coming Soon"
  },
  modules: {
    welcome: {
      ...moduleNames.welcome,
      description:
        "Welcome to the Generative AI for Marketing Transformation workshop! Please connect to the local network and open the essential tools listed below to get ready.",
      prompts: []
    },
    foundations: {
      ...moduleNames.foundations,
      description:
        "Establish core concepts of prompt engineering, model selection, and the AI Impact Ladder to transition from simple assistants to transformative workflows.",
      workshops: foundationsWorkshops,
      prompts: []
    },
    "personas-research": {
      ...moduleNames["personas-research"],
      description:
        "Use generative AI to sharpen customer understanding, pressure-test audience assumptions, and turn messy market context into actionable persona insights.",
      workshops: personasResearchWorkshops,
      prompts: []
    },
    "copywriting-content": {
      ...moduleNames["copywriting-content"],
      description:
        "Move from blank page to tested messaging faster with repeatable copywriting frameworks, voice adaptation, and creative iteration prompts.",
      prompts: [
        "Rewrite this headline and introductory email using the PAS (Problem-Agitation-Solution) framework: 'Our project management tool keeps remote teams synchronized, helping you meet deadlines easily without messy email chains.'"
      ]
    },
    "campaign-strategy": {
      ...moduleNames["campaign-strategy"],
      description:
        "Translate positioning, audience intent, and channel roles into campaign plans that marketing teams can execute and adapt.",
      prompts: [
        "Draft a multi-channel launch calendar for a SaaS product targeting HR managers to automate employee onboarding. Provide a 4-week timeline covering LinkedIn thought leadership, email nurture sequences, and retargeting ad concepts."
      ]
    },
    "media-visuals": {
      ...moduleNames["media-visuals"],
      description:
        "Design advanced prompt instructions for high-impact visual generation, storyboarding, and video assets that remain consistent with brand guidelines.",
      prompts: [
        "Create a detailed image generation prompt (Midjourney/DALL-E style) for a premium, organic coffee brand. The image should feature a minimalist glass bottle of cold brew on a clean, sunlit travertine stone, surrounded by raw coffee beans and subtle green botanical shadows. Style: commercial product photography, warm natural lighting, shallow depth of field."
      ]
    },
    "ai-agents": {
      ...moduleNames["ai-agents"],
      description:
        "Set up structured prompt rules and context windows to deploy custom AI agents as dedicated strategic thinking partners and automated task executors.",
      prompts: [
        "Define a system prompt for a custom GPT agent acting as a 'Brand Voice Safeguard'. The agent should analyze draft copywriting against our brand guidelines (professional, witty, jargon-free, high-empathy) and output a color-coded scorecard highlighting violations, along with three polished alternatives."
      ]
    },
    "brand-analytics": {
      ...moduleNames["brand-analytics"],
      description:
        "Utilize AI to extract customer sentiment from unstructured data and define cohesive, long-term brand positioning strategies.",
      prompts: [
        "Act as a senior marketing analyst. Analyze this raw customer feedback dataset [Insert feedback] to identify the top three positive themes, top three pain points, and draft a corrective messaging strategy to address the primary customer concerns."
      ]
    },
    "wrap-up": {
      ...moduleNames["wrap-up"],
      description:
        "Thank you for attending the Generative AI for Marketing Transformation workshop! Please take a moment to provide your feedback and join our alumni community to continue your generative AI journey.",
      prompts: []
    }
  },
  welcome: {
    wifiTitle: "WiFi Access Credentials",
    networkSsid: "Network SSID",
    password: "Password",
    essentialTools: "Essential AI Tools",
    gemini: {
      name: "Google Gemini",
      description: "Excellent for live search, real-time Google Workspace integration, and speed.",
      launch: "Launch Gemini"
    },
    chatgpt: {
      name: "OpenAI ChatGPT",
      description: "Highly capable general model, ideal for logical reasoning and structured output.",
      launch: "Launch ChatGPT"
    },
    claude: {
      name: "Anthropic Claude",
      description: "Superb writing capabilities, rich formatting, and high-velocity copywriting.",
      launch: "Launch Claude"
    }
  },
  personasResearch: {
    essentialTool: "Essential Tool",
    notebooklm: {
      name: "Google NotebookLM",
      description: "Turn your source documents into a grounded research notebook with cited answers and audio overviews.",
      launch: "Launch NotebookLM"
    }
  },
  wrapUp: {
    slidesTitle: "Workshop Presentation Slides",
    slidesDescription:
      "Revisit the full Generative AI for Marketing Transformation deck anytime. Open the Google Slides presentation to review key concepts, frameworks, and examples from the session.",
    openSlides: "Open Slides",
    feedbackTitle: "Workshop Feedback Survey",
    feedbackDescription:
      "Your feedback is invaluable in shaping future cohorts of this workshop. Please take a few moments to share your thoughts, what worked well, and where we can improve.",
    feedbackButton: "Feedback Form",
    formComingSoon: "Form Link Coming Soon",
    discordTitle: "Discord Alumni Community",
    discordDescription:
      "Keep the momentum going! Join our private Discord community to network with other alumni, collaborate on marketing strategies, and share your operational victories.",
    discordButton: "Join Alumni Discord",
    discordComingSoon: "Discord Link Coming Soon"
  }
};
