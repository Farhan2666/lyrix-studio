import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const templates = [
  {
    name: "Neon Pulse",
    genre: "EDM",
    mood: "Energetic",
    complexity: "Complex",
    bpmRange: "120-150",
    defaultProps: {
      fontFamily: "Space Grotesk",
      fontSize: 36,
      fontWeight: 700,
      color: "#F0F0FF",
      textAlign: "center",
      background: { type: "gradient", value: "linear-gradient(135deg, #6E00FF, #00FFE0, #FF2D75)" },
      animation: { preset: "wave", speed: 1.2, bpm: 128 },
    },
  },
  {
    name: "Midnight Vapor",
    genre: "Synthwave",
    mood: "Melancholic",
    complexity: "Medium",
    bpmRange: "80-100",
    defaultProps: {
      fontFamily: "Inter",
      fontSize: 32,
      fontWeight: 600,
      color: "#FF2D75",
      textAlign: "center",
      background: { type: "gradient", value: "linear-gradient(135deg, #0A0A12, #FF2D75, #6E00FF)" },
      animation: { preset: "glow", speed: 0.8, bpm: 90 },
    },
  },
  {
    name: "Urban Flow",
    genre: "Hip-Hop",
    mood: "Energetic",
    complexity: "Simple",
    bpmRange: "85-110",
    defaultProps: {
      fontFamily: "Inter",
      fontSize: 40,
      fontWeight: 800,
      color: "#00FFE0",
      textAlign: "center",
      background: { type: "solid", value: "#0A0A12" },
      animation: { preset: "bounce", speed: 1, bpm: 95 },
    },
  },
  {
    name: "Acoustic Warmth",
    genre: "Indie",
    mood: "Melancholic",
    complexity: "Simple",
    bpmRange: "65-85",
    defaultProps: {
      fontFamily: "Georgia",
      fontSize: 28,
      fontWeight: 400,
      color: "#D0D5F9",
      textAlign: "left",
      background: { type: "gradient", value: "linear-gradient(135deg, #1A1A2E, #0A0A12)" },
      animation: { preset: "fade", speed: 0.7, bpm: 75 },
    },
  },
];

async function seed() {
  console.log("Seeding templates...");
  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase().replace(/\s+/g, "-") },
      update: template,
      create: { id: template.name.toLowerCase().replace(/\s+/g, "-"), ...template },
    });
  }
  console.log("Templates seeded successfully.");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
