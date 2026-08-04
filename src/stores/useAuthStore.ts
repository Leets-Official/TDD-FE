import { create } from "zustand";
import { persist } from "zustand/middleware";

import { VERIFIED_EMAIL_KEY } from "@/constants/storage";

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
      clearAuth: () => {
        // 회원가입·비밀번호 찾기 도중 이탈해 남은 인증 이메일도 함께 정리
        Object.values(VERIFIED_EMAIL_KEY).forEach((key) => {
          sessionStorage.removeItem(key);
        });

        set({ accessToken: null, refreshToken: null });
      },
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
