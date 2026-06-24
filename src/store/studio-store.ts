import { create } from "zustand";

export interface LyricLine {
  id: string;
  text: string;
  timestamp: number;
  duration: number;
}

export interface DesignProperties {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  textAlign: "left" | "center" | "right";
  background: {
    type: "gradient" | "image" | "video" | "solid";
    value: string;
  };
  animation: {
    preset: string;
    speed: number;
    bpm: number;
  };
}

export type ViewMode = "2d" | "3d" | "ar";

interface StudioState {
  lyrics: LyricLine[];
  currentLine: number;
  designProps: DesignProperties;
  viewMode: ViewMode;
  isPlaying: boolean;
  currentTime: number;
  audioFile: File | null;

  setLyrics: (lyrics: LyricLine[]) => void;
  setCurrentLine: (index: number) => void;
  updateDesignProps: (props: Partial<DesignProperties>) => void;
  setViewMode: (mode: ViewMode) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setAudioFile: (file: File | null) => void;
}

const defaultDesign: DesignProperties = {
  fontFamily: "Inter",
  fontSize: 32,
  fontWeight: 700,
  color: "#F0F0FF",
  textAlign: "center",
  background: {
    type: "gradient",
    value: "linear-gradient(135deg, #0A0A12 0%, #1A1A2E 100%)",
  },
  animation: {
    preset: "fade",
    speed: 1,
    bpm: 120,
  },
};

export const useStudioStore = create<StudioState>((set) => ({
  lyrics: [],
  currentLine: 0,
  designProps: defaultDesign,
  viewMode: "2d",
  isPlaying: false,
  currentTime: 0,
  audioFile: null,

  setLyrics: (lyrics) => set({ lyrics }),
  setCurrentLine: (currentLine) => set({ currentLine }),
  updateDesignProps: (props) =>
    set((state) => ({
      designProps: { ...state.designProps, ...props },
    })),
  setViewMode: (viewMode) => set({ viewMode }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setAudioFile: (audioFile) => set({ audioFile }),
}));
