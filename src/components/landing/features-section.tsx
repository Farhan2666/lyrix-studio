"use client";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3V21M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Live Design Studio",
    description:
      "Panel kontrol CSS real-time untuk font, warna, ukuran, dan animasi. Semua perubahan terlihat instan.",
    gradient: "from-neon-indigo to-hologram-teal",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 18V5L21 3V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Audio-Reactive Animation",
    description:
      "Animasi teks yang sinkron dengan BPM dan waveform audio. Real-time FFT analysis untuk presisi milidetik.",
    gradient: "from-hologram-teal to-retro-pink",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Dynamic Themes",
    description:
      "Template untuk setiap genre musik dengan animasi preset yang sinkron dengan BPM lagu.",
    gradient: "from-retro-pink to-neon-indigo",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Hardware Integration",
    description:
      "Sync dengan Philips Hue, Nanoleaf, dan 15+ perangkat RGB lainnya untuk pengalaman imersif.",
    gradient: "from-neon-indigo to-retro-pink",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 17V4H20V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 20H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 20L12 15L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "4K Export",
    description:
      "Ekspor desain sebagai video 4K/1080p, GIF, atau SVG. Embed codes untuk website dan blog.",
    gradient: "from-hologram-teal to-neon-indigo",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Collaborative Editing",
    description:
      "Real-time cloud sync untuk project tim. Role-based permissions, commenting, dan version history.",
    gradient: "from-retro-pink to-hologram-teal",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-neon-indigo to-hologram-teal bg-clip-text text-transparent">
              design lyrics visually
            </span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Dari kontrol font hingga integrasi hardware — semua dalam satu platform.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-lighter p-6 transition-all hover:border-border-hover"
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white`}
              >
                {feature.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold text-text-primary">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
