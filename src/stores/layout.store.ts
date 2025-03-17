import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
  open: boolean;

  setOpen: (mode: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      open: true,

      setOpen: (mode) => set({ open: mode }),
    }),
    { name: "layout-storage" },
  ),
);
