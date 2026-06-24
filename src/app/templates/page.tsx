"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const allTemplates = [
  { title: "Neon Pulse", genre: "EDM", bpm: 128, mood: "Energetic", complexity: "Complex", gradient: "from-neon-indigo via-hologram-teal to-retro-pink" },
  { title: "Midnight Vapor", genre: "Synthwave", bpm: 90, mood: "Melancholic", complexity: "Medium", gradient: "from-retro-pink via-neon-indigo to-quantum-black" },
  { title: "Urban Flow", genre: "Hip-Hop", bpm: 95, mood: "Energetic", complexity: "Simple", gradient: "from-hologram-teal via-surface-light to-neon-indigo" },
  { title: "Acoustic Warmth", genre: "Indie", bpm: 110, mood: "Melancholic", complexity: "Simple", gradient: "from-liquid-silver via-surface-light to-hologram-teal" },
  { title: "Cyber Rain", genre: "EDM", bpm: 140, mood: "Energetic", complexity: "Complex", gradient: "from-neon-indigo via-surface to-hologram-teal" },
  { title: "Lo-Fi Beats", genre: "Hip-Hop", bpm: 85, mood: "Melancholic", complexity: "Simple", gradient: "from-surface-light via-liquid-silver to-retro-pink" },
  { title: "Rock Anthem", genre: "Rock", bpm: 150, mood: "Energetic", complexity: "Medium", gradient: "from-retro-pink via-surface to-neon-indigo" },
  { title: "Jazz Night", genre: "Indie", bpm: 70, mood: "Melancholic", complexity: "Medium", gradient: "from-liquid-silver via-surface-lighter to-hologram-teal" },
];

const genres = ["All", "EDM", "Synthwave", "Hip-Hop", "Indie", "Rock"];
const moods = ["All", "Energetic", "Melancholic"];

function TemplatesContent() {
  const searchParams = useSearchParams();
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeMood, setActiveMood] = useState("All");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const matched = allTemplates.find(
        (t) => t.title.toLowerCase() === q.toLowerCase()
      );
      if (matched) setActiveGenre(matched.genre);
    }
  }, [searchParams]);

  const filtered = allTemplates.filter((t) => {
    if (activeGenre !== "All" && t.genre !== activeGenre) return false;
    if (activeMood !== "All" && t.mood !== activeMood) return false;
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary">
              Template
              <span className="bg-gradient-to-r from-hologram-teal to-retro-pink bg-clip-text text-transparent"> Gallery</span>
            </h1>
            <p className="mt-3 text-text-secondary">
              Professionally designed themes for every genre and mood.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveGenre(genre)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeGenre === genre
                      ? "bg-neon-indigo text-white"
                      : "border border-border text-text-secondary hover:border-border-hover hover:text-text-primary"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className="h-5 w-px bg-border" />
            <div className="flex gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setActiveMood(mood)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    activeMood === mood
                      ? "bg-neon-indigo text-white"
                      : "border border-border text-text-secondary hover:border-border-hover hover:text-text-primary"
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((template) => (
              <Link
                key={template.title}
                href="/studio"
                className="group"
              >
                <div className={`relative h-52 overflow-hidden rounded-2xl bg-gradient-to-br ${template.gradient} p-6 transition-all group-hover:shadow-[0_0_30px_rgba(110,0,255,0.3)]`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex h-full flex-col justify-end">
                    <h3 className="font-heading text-lg font-bold text-white">
                      {template.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/70">
                      <span>{template.genre}</span>
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      <span>{template.bpm} BPM</span>
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      <span>{template.mood}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-white">
                      Use Template
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-text-muted">{template.complexity}</span>
                  <span className="text-xs text-hologram-teal">Apply &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={null}>
      <TemplatesContent />
    </Suspense>
  );
}
