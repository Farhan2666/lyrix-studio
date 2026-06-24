"use client";

const templates = [
  {
    title: "Neon Pulse",
    genre: "EDM",
    bpm: "128",
    gradient: "from-neon-indigo via-hologram-teal to-retro-pink",
  },
  {
    title: "Midnight Vapor",
    genre: "Synthwave",
    bpm: "90",
    gradient: "from-retro-pink via-neon-indigo to-quantum-black",
  },
  {
    title: "Urban Flow",
    genre: "Hip-Hop",
    bpm: "95",
    gradient: "from-hologram-teal via-surface-light to-neon-indigo",
  },
  {
    title: "Acoustic Warmth",
    genre: "Indie",
    bpm: "110",
    gradient: "from-liquid-silver via-surface-light to-hologram-teal",
  },
];

export default function TemplatesSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Genre-specific
            <br />
            <span className="bg-gradient-to-r from-hologram-teal to-retro-pink bg-clip-text text-transparent">
              templates
            </span>
          </h2>
          <p className="mt-4 text-text-secondary">
            Mulai dengan template yang dirancang untuk genre musik Anda.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <div
              key={template.title}
              className="group cursor-pointer"
            >
              <div
                className={`relative h-48 overflow-hidden rounded-2xl bg-gradient-to-br ${template.gradient} p-6 transition-all group-hover:shadow-[0_0_30px_rgba(110,0,255,0.3)]`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex h-full flex-col justify-end">
                  <h3 className="font-heading text-lg font-bold text-white">
                    {template.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-white/70">
                    <span>{template.genre}</span>
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    <span>{template.bpm} BPM</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white">
                    Preview
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
