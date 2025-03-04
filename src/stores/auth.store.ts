import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const user = await authService.login(email, password);
          set({ user, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
      logout: () => set({ user: null }),
      resetPassword: async (email) => {
        // Implementar lógica de reset
      },
    }),
    { name: "auth-storage" },
  ),
);
