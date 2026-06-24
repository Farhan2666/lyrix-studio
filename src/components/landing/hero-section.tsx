"use client";

import Link from "next/link";

const quickActions = [
  {
    href: "/studio",
    title: "Studio",
    desc: "Lyric design real-time dengan kontrol penuh",
    gradient: "from-neon-indigo to-hologram-teal",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3V21M3 12H21" />
        <rect x="5" y="5" width="14" height="14" rx="3" />
      </svg>
    ),
  },
  {
    href: "/lyrics",
    title: "Lyrics",
    desc: "Cari lirik jutaan lagu dari database global",
    gradient: "from-hologram-teal to-retro-pink",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5L21 3V16" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    href: "/templates",
    title: "Templates",
    desc: "Mulai cepat dengan template siap pakai",
    gradient: "from-retro-pink to-neon-indigo",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    href: "/export",
    title: "Export",
    desc: "Ekspor sebagai video 4K, GIF, atau SVG",
    gradient: "from-neon-indigo to-retro-pink",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17V4H20V17" />
        <path d="M2 20H22" />
        <path d="M8 20L12 15L16 20" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-indigo/5 via-transparent to-surface" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-lighter px-4 py-1.5 text-xs font-medium text-hologram-teal">
          <span className="flex h-2 w-2 rounded-full bg-hologram-teal animate-pulse-glow" />
          Real-time Lyric Design Platform
        </div>

        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
          Paint Your
          <br />
          <span className="bg-gradient-to-r from-neon-indigo via-hologram-teal to-retro-pink bg-clip-text text-transparent">
            Sound
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          Platform desain lirik real-time — cari lagu, edit visual, ekspor dalam hitungan menit.
        </p>

        {/* Quick Action Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-lighter p-6 text-left transition-all hover:border-border-hover hover:shadow-[0_0_30px_rgba(110,0,255,0.15)]"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} text-white`}>
                {action.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-neon-indigo transition-colors">
                {action.title}
              </h3>
              <p className="mt-1.5 text-sm text-text-muted leading-relaxed">
                {action.desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-neon-indigo opacity-0 transition-opacity group-hover:opacity-100">
                Explore
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3L11 8L6 13" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-12">
          {[
            { value: "4K", label: "Video Export" },
            { value: "60", label: "FPS Animation" },
            { value: "15+", label: "Device Sync" },
          ].map((stat) => (
            <div key={stat.value}>
              <div className="font-heading text-2xl font-bold text-text-primary sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
