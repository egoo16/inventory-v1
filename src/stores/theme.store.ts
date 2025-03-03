import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  mode: "light" | "dark";
  tenantId?: string;
  toggleMode: () => void;
  setTenant: (tenantId: string) => Promise<void>;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      toggleMode: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
      setTenant: async (tenantId) => {
        // Lógica para obtener configuración del tenant
        set({ tenantId });
      },
    }),
    { name: "theme-storage" },
  ),
);
