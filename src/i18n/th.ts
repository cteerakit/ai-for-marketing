import { WORKSHOP_NAME } from "./constants";
import { foundationsWorkshops } from "./foundations-workshops";
import { moduleNames } from "./modules";
import { personasResearchWorkshops } from "./personas-research-workshops";
import type { LocaleStrings } from "./types";

export const th: LocaleStrings = {
  meta: {
    title: WORKSHOP_NAME,
    description: "แอปคู่มือเวิร์กช็อป Generative AI สำหรับการเปลี่ยนแปลงการตลาด"
  },
  ui: {
    workshop: "เวิร์กช็อป",
    appTitle: WORKSHOP_NAME,
    sidebarAria: "แถบด้านข้างเวิร์กช็อป",
    navAria: "โมดูลเวิร์กช็อป",
    selectModule: "เลือกโมดูล",
    hideSidebar: "ซ่อนแถบด้านข้าง",
    showSidebar: "แสดงแถบด้านข้าง",
    switchToLight: "เปลี่ยนเป็นโหมดสว่าง",
    switchToDark: "เปลี่ยนเป็นโหมดมืด",
    language: "ภาษา",
    english: "English",
    thai: "ไทย",
    copy: "คัดลอก",
    copied: "คัดลอกแล้ว!",
    tryAgain: "ลองอีกครั้ง",
    promptLabel: "พรอมต์",
    promptCustomize: "ปรับแต่งพรอมต์",
    copySsid: "คัดลอก SSID",
    copyPassword: "คัดลอกรหัสผ่าน",
    comingSoon: "เร็วๆ นี้"
  },
  modules: {
    welcome: {
      ...moduleNames.welcome,
      description:
        "ยินดีต้อนรับสู่เวิร์กช็อป Generative AI สำหรับการเปลี่ยนแปลงการตลาด! กรุณาเชื่อมต่อเครือข่ายท้องถิ่นและเปิดเครื่องมือที่จำเป็นด้านล่างเพื่อเตรียมพร้อม",
      prompts: []
    },
    foundations: {
      ...moduleNames.foundations,
      description:
        "สร้างความเข้าใจหลักเกี่ยวกับ prompt engineering การเลือกโมเดล และ AI Impact Ladder เพื่อยกระดับจากผู้ช่วยง่ายๆ สู่เวิร์กโฟลว์ที่เปลี่ยนแปลงธุรกิจ",
      workshops: foundationsWorkshops,
      prompts: []
    },
    "personas-research": {
      ...moduleNames["personas-research"],
      description:
        "ใช้ generative AI เพื่อเพิ่มความเข้าใจลูกค้า ทดสอบสมมติฐานกลุ่มเป้าหมาย และเปลี่ยนข้อมูลตลาดที่ซับซ้อนให้เป็นข้อมูลเชิงลึกของ persona ที่นำไปใช้ได้จริง",
      workshops: personasResearchWorkshops,
      prompts: []
    },
    "copywriting-content": {
      ...moduleNames["copywriting-content"],
      description:
        "ย้ายจากหน้าเปล่าไปสู่ข้อความที่ทดสอบแล้วได้เร็วขึ้น ด้วยกรอบการเขียนคัดลอกที่ทำซ้ำได้ การปรับโทนเสียง และพรอมต์สำหรับการสร้างสรรค์",
      prompts: [
        "Rewrite this headline and introductory email using the PAS (Problem-Agitation-Solution) framework: 'Our project management tool keeps remote teams synchronized, helping you meet deadlines easily without messy email chains.'"
      ]
    },
    "campaign-strategy": {
      ...moduleNames["campaign-strategy"],
      description:
        "แปลง positioning ความตั้งใจของกลุ่มเป้าหมาย และบทบาทของช่องทาง ให้เป็นแผนแคมเปญที่ทีมการตลาดสามารถดำเนินการและปรับได้",
      prompts: [
        "Draft a multi-channel launch calendar for a SaaS product targeting HR managers to automate employee onboarding. Provide a 4-week timeline covering LinkedIn thought leadership, email nurture sequences, and retargeting ad concepts."
      ]
    },
    "media-visuals": {
      ...moduleNames["media-visuals"],
      description:
        "ออกแบบคำสั่งพรอมต์ขั้นสูงสำหรับการสร้างภาพ สตอรี่บอร์ด และวิดีโอที่มีผลกระทบสูง โดยยังคงสอดคล้องกับแนวทางแบรนด์",
      prompts: [
        "Create a detailed image generation prompt (Midjourney/DALL-E style) for a premium, organic coffee brand. The image should feature a minimalist glass bottle of cold brew on a clean, sunlit travertine stone, surrounded by raw coffee beans and subtle green botanical shadows. Style: commercial product photography, warm natural lighting, shallow depth of field."
      ]
    },
    "ai-agents": {
      ...moduleNames["ai-agents"],
      description:
        "ตั้งค่ากฎพรอมต์และ context window ที่มีโครงสร้าง เพื่อปรับใช้ AI agents แบบกำหนดเองเป็นคู่คิดเชิงกลยุทธ์และผู้ดำเนินงานอัตโนมัติ",
      prompts: [
        "Define a system prompt for a custom GPT agent acting as a 'Brand Voice Safeguard'. The agent should analyze draft copywriting against our brand guidelines (professional, witty, jargon-free, high-empathy) and output a color-coded scorecard highlighting violations, along with three polished alternatives."
      ]
    },
    "brand-analytics": {
      ...moduleNames["brand-analytics"],
      description:
        "ใช้ AI ดึง sentiment ของลูกค้าจากข้อมูลที่ไม่มีโครงสร้าง และกำหนดกลยุทธ์ positioning แบรนด์ระยะยาวที่สอดคล้องกัน",
      prompts: [
        "Act as a senior marketing analyst. Analyze this raw customer feedback dataset [Insert feedback] to identify the top three positive themes, top three pain points, and draft a corrective messaging strategy to address the primary customer concerns."
      ]
    },
    "wrap-up": {
      ...moduleNames["wrap-up"],
      description:
        "ขอบคุณที่เข้าร่วมเวิร์กช็อป Generative AI สำหรับการเปลี่ยนแปลงการตลาด! กรุณาให้ข้อเสนอแนะและเข้าร่วมชุมชนศิษย์เก่าของเราเพื่อเดินหน้าต่อในเส้นทาง generative AI",
      prompts: []
    }
  },
  welcome: {
    wifiTitle: "ข้อมูลการเข้าถึง WiFi",
    networkSsid: "ชื่อเครือข่าย (SSID)",
    password: "รหัสผ่าน",
    essentialTools: "เครื่องมือ AI ที่จำเป็น",
    gemini: {
      name: "Google Gemini",
      description: "เหมาะสำหรับการค้นหาแบบเรียลไทม์ การเชื่อมต่อ Google Workspace และความเร็ว",
      launch: "เปิด Gemini"
    },
    chatgpt: {
      name: "OpenAI ChatGPT",
      description: "โมเดลทั่วไปที่มีประสิทธิภาพสูง เหมาะสำหรับการให้เหตุผลเชิงตรรกะและผลลัพธ์ที่มีโครงสร้าง",
      launch: "เปิด ChatGPT"
    },
    claude: {
      name: "Anthropic Claude",
      description: "ทักษะการเขียนยอดเยี่ยม การจัดรูปแบบที่หลากหลาย และการเขียนคัดลอกที่รวดเร็ว",
      launch: "เปิด Claude"
    }
  },
  personasResearch: {
    essentialTool: "เครื่องมือที่จำเป็น",
    notebooklm: {
      name: "Google NotebookLM",
      description: "เปลี่ยนเอกสารต้นทางของคุณเป็นสมุดบันทึกวิจัยที่อ้างอิงได้ พร้อมคำตอบที่มีแหล่งอ้างอิงและสรุปเสียง",
      launch: "เปิด NotebookLM"
    }
  },
  wrapUp: {
    slidesTitle: "สไลด์นำเสนอเวิร์กช็อป",
    slidesDescription:
      "ทบทวนสไลด์ Generative AI สำหรับการเปลี่ยนแปลงการตลาดได้ทุกเมื่อ เปิด Google Slides เพื่อดูแนวคิด กรอบงาน และตัวอย่างจากเซสชัน",
    openSlides: "เปิดสไลด์",
    feedbackTitle: "แบบสำรวจความคิดเห็นเวิร์กช็อป",
    feedbackDescription:
      "ความคิดเห็นของคุณมีค่ามากในการพัฒนารุ่นถัดไปของเวิร์กช็อปนี้ กรุณาใช้เวลาสักครู่แบ่งปันความคิดเห็น สิ่งที่ดี และจุดที่เราสามารถปรับปรุงได้",
    feedbackButton: "แบบฟอร์มความคิดเห็น",
    formComingSoon: "ลิงก์แบบฟอร์มเร็วๆ นี้",
    discordTitle: "ชุมชนศิษย์เก่า Discord",
    discordDescription:
      "รักษาโมเมนตัมต่อไป! เข้าร่วมชุมชน Discord ส่วนตัวของเราเพื่อสร้างเครือข่ายกับศิษย์เก่า ร่วมมือกันวางกลยุทธ์การตลาด และแบ่งปันความสำเร็จในการดำเนินงาน",
    discordButton: "เข้าร่วม Discord ศิษย์เก่า",
    discordComingSoon: "ลิงก์ Discord เร็วๆ นี้"
  }
};
