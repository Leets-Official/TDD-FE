import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),
      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    {
      name: "auth",
      partialize: ({ accessToken, refreshToken }) => ({
        accessToken,
        refreshToken,
      }),
    }
  )
);
