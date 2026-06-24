"use client";

import { useStudioStore } from "@/store/studio-store";

export default function PreviewPane() {
  const { lyrics, currentLine, designProps, viewMode, setViewMode } = useStudioStore();

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-lighter">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text-muted">Preview</span>
          {lyrics.length > 0 && (
            <span className="text-xs text-text-muted">
              {lyrics.length} lines
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
          {(["2d", "3d", "ar"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                viewMode === mode
                  ? "bg-neon-indigo text-white"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        {lyrics.length === 0 ? (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-text-muted">
                <path d="M9 18V5L21 3V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <p className="text-sm text-text-muted">
              Upload audio or add lyrics to start designing
            </p>
          </div>
        ) : (
          <div
            className="w-full text-center transition-all"
            style={{
              fontFamily: designProps.fontFamily,
              fontSize: `${designProps.fontSize}px`,
              fontWeight: designProps.fontWeight,
              textAlign: designProps.textAlign,
            }}
          >
            {lyrics.map((line, i) => (
              <p
                key={line.id}
                className={`py-1.5 transition-all ${
                  i === currentLine
                    ? "text-text-primary"
                    : "text-text-muted"
                } ${i === currentLine ? "scale-105" : "scale-100"}`}
                style={{
                  color: i === currentLine ? designProps.color : undefined,
                  textShadow:
                    i === currentLine
                      ? `0 0 20px ${designProps.color}40`
                      : undefined,
                }}
              >
                {line.text}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 border-t border-border px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="flex h-1.5 w-1.5 rounded-full bg-hologram-teal animate-pulse-glow" />
          Ready
        </div>
        <span className="text-xs text-text-muted">
          {designProps.animation.bpm} BPM
        </span>
      </div>
    </div>
  );
}
