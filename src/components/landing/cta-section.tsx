"use client";

import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-neon-indigo/10 via-surface-lighter to-hologram-teal/10 p-12 sm:p-16">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-neon-indigo/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-hologram-teal/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Ready to paint your sound?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Mulai buat lyric visuals dalam hitungan menit. Gratis, tanpa perlu
              pengalaman desain.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/studio"
                className="rounded-full bg-gradient-to-r from-neon-indigo to-hologram-teal px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(110,0,255,0.5)]"
              >
                Get Started Free
              </Link>
              <Link
                href="/templates"
                className="rounded-full border border-border px-8 py-3.5 text-sm font-medium text-text-primary transition-colors hover:border-border-hover"
              >
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
