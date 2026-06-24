"use client";

import { useStudioStore } from "@/store/studio-store";
import { useState } from "react";
import SmartTemplateSuggest from "./template-suggest";

type PanelTab = "typography" | "appearance" | "animation";

function getGenreFromBpm(bpm: number): string {
  if (bpm >= 120 && bpm <= 150) return "EDM";
  if (bpm >= 80 && bpm <= 100) return "Synthwave";
  if (bpm >= 85 && bpm <= 110) return "Hip-Hop";
  if (bpm >= 65 && bpm <= 85) return "Indie";
  if (bpm >= 130 && bpm <= 160) return "Rock";
  if (bpm >= 100 && bpm <= 130) return "Pop";
  if (bpm >= 60 && bpm <= 80) return "Jazz";
  return "Pop";
}

export default function ControlPanel() {
  const { designProps, updateDesignProps } = useStudioStore();
  const [activeTab, setActiveTab] = useState<PanelTab>("typography");

  const tabs: { id: PanelTab; label: string }[] = [
    { id: "typography", label: "Typography" },
    { id: "appearance", label: "Appearance" },
    { id: "animation", label: "Animation" },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-lighter lg:w-80">
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2.5 text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "border-b-2 border-neon-indigo text-text-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {activeTab === "typography" && (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Font
              </label>
              <select
                value={designProps.fontFamily}
                onChange={(e) => updateDesignProps({ fontFamily: e.target.value })}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-neon-indigo"
              >
                <option value="Inter">Inter</option>
                <option value="Space Grotesk">Space Grotesk</option>
                <option value="Georgia">Georgia</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Size — {designProps.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="96"
                value={designProps.fontSize}
                onChange={(e) => updateDesignProps({ fontSize: Number(e.target.value) })}
                className="w-full accent-neon-indigo"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Weight
              </label>
              <div className="flex gap-1">
                {[300, 400, 500, 600, 700, 800].map((w) => (
                  <button
                    key={w}
                    onClick={() => updateDesignProps({ fontWeight: w })}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                      designProps.fontWeight === w
                        ? "bg-neon-indigo text-white"
                        : "bg-surface text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Alignment
              </label>
              <div className="flex gap-1">
                {(["left", "center", "right"] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateDesignProps({ textAlign: align })}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-all ${
                      designProps.textAlign === align
                        ? "bg-neon-indigo text-white"
                        : "bg-surface text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "appearance" && (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Text Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={designProps.color}
                  onChange={(e) => updateDesignProps({ color: e.target.value })}
                  className="h-9 w-9 cursor-pointer rounded-lg border border-border bg-transparent"
                />
                <span className="text-xs text-text-muted">{designProps.color}</span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Background Type
              </label>
              <div className="flex gap-1">
                {(["solid", "gradient"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      updateDesignProps({
                        background: { ...designProps.background, type },
                      })
                    }
                    className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-all ${
                      designProps.background.type === type
                        ? "bg-neon-indigo text-white"
                        : "bg-surface text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Background Value
              </label>
              <textarea
                value={designProps.background.value}
                onChange={(e) =>
                  updateDesignProps({
                    background: { ...designProps.background, value: e.target.value },
                  })
                }
                rows={3}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary outline-none focus:border-neon-indigo resize-none"
              />
            </div>
          </>
        )}

        {activeTab === "animation" && (
          <>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Preset
              </label>
              <select
                value={designProps.animation.preset}
                onChange={(e) =>
                  updateDesignProps({
                    animation: { ...designProps.animation, preset: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary outline-none focus:border-neon-indigo"
              >
                <option value="fade">Fade In</option>
                <option value="typing">Typewriter</option>
                <option value="slide">Slide Up</option>
                <option value="bounce">Bounce</option>
                <option value="glow">Glow Pulse</option>
                <option value="wave">Waveform</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                Speed — {designProps.animation.speed}x
              </label>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.1"
                value={designProps.animation.speed}
                onChange={(e) =>
                  updateDesignProps({
                    animation: {
                      ...designProps.animation,
                      speed: Number(e.target.value),
                    },
                  })
                }
                className="w-full accent-neon-indigo"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-muted">
                BPM Sync — {designProps.animation.bpm} BPM
              </label>
              <input
                type="range"
                min="60"
                max="200"
                value={designProps.animation.bpm}
                onChange={(e) =>
                  updateDesignProps({
                    animation: {
                      ...designProps.animation,
                      bpm: Number(e.target.value),
                    },
                  })
                }
                className="w-full accent-neon-indigo"
              />
            </div>

            <div className="rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center gap-2 text-xs text-hologram-teal">
                <span className="flex h-1.5 w-1.5 rounded-full bg-hologram-teal animate-pulse-glow" />
                Audio-reactive animation active
              </div>
              <p className="mt-1 text-xs text-text-muted">
                Animations sync with BPM and waveform in real-time.
              </p>
            </div>

            <SmartTemplateSuggest genre={getGenreFromBpm(designProps.animation.bpm)} />
          </>
        )}
      </div>
    </div>
  );
}
