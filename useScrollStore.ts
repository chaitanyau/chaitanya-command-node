import { create } from 'zustand';

// This store will hold one value: the browser's scroll progress from 0 to 1.
interface ScrollState {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));