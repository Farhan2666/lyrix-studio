"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useState } from "react";
import Link from "next/link";

type Format = "mp4" | "webm" | "gif" | "svg" | "png";
type Resolution = "1080p" | "4K" | "SVG";

export default function ExportPage() {
  const [format, setFormat] = useState<Format>("mp4");
  const [resolution, setResolution] = useState<Resolution>("1080p");
  const [fps] = useState(30);
  const [exporting, setExporting] = useState(false);

  const formats: { id: Format; label: string; desc: string }[] = [
    { id: "mp4", label: "MP4", desc: "Best for social media" },
    { id: "webm", label: "WebM", desc: "Transparent background" },
    { id: "gif", label: "GIF", desc: "Lightweight animation" },
    { id: "svg", label: "SVG", desc: "Scalable vector" },
    { id: "png", label: "PNG", desc: "High-res image" },
  ];

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 3000);
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary">
              Export
              <span className="bg-gradient-to-r from-retro-pink to-neon-indigo bg-clip-text text-transparent"> Hub</span>
            </h1>
            <p className="mt-3 text-text-secondary">
              Export your lyric design in the format you need.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-sm font-semibold text-text-primary">Format</h3>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {formats.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        format === f.id
                          ? "border-neon-indigo bg-neon-indigo/10"
                          : "border-border hover:border-border-hover"
                      }`}
                    >
                      <div className={`text-sm font-semibold ${format === f.id ? "text-neon-indigo" : "text-text-primary"}`}>
                        {f.label}
                      </div>
                      <div className="mt-0.5 text-[10px] text-text-muted">{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-sm font-semibold text-text-primary">Resolution</h3>
                <div className="mt-3 flex gap-2">
                  {(["1080p", "4K", "SVG"] as Resolution[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => setResolution(r)}
                      className={`flex-1 rounded-xl border py-3 text-center text-sm font-medium transition-all ${
                        resolution === r
                          ? "border-neon-indigo bg-neon-indigo/10 text-neon-indigo"
                          : "border-border text-text-secondary hover:border-border-hover"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface-lighter p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Frame Rate</span>
                  <span className="text-text-primary font-medium">{fps} FPS</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-text-muted">Estimated Size</span>
                  <span className="text-text-primary font-medium">
                    {format === "gif" ? "~12 MB" : format === "svg" ? "~2 MB" : resolution === "4K" ? "~150 MB" : "~45 MB"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleExport}
                disabled={exporting}
                className="w-full rounded-full bg-gradient-to-r from-neon-indigo to-hologram-teal py-3.5 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(110,0,255,0.5)] disabled:opacity-50"
              >
                {exporting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Rendering...
                  </span>
                ) : (
                  "Start Export"
                )}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex-1 rounded-2xl border border-border bg-surface-lighter p-8 flex items-center justify-center">
                <div className="text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto text-text-muted">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 17V21" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <p className="mt-4 text-sm text-text-muted">Preview</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {resolution} {format.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/studio"
                  className="flex-1 rounded-full border border-border py-2.5 text-center text-sm font-medium text-text-secondary transition-colors hover:border-border-hover"
                >
                  Back to Studio
                </Link>
                <button className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-hover">
                  Share Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
