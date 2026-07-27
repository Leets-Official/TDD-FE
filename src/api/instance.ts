import axios from "axios";

import { PATH } from "@/routes/paths";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ApiResponse } from "@/types/api";
import type { AuthTokenResponse } from "@/types/auth/auth";

const BASE_CONFIG = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
};

// 토큰이 필요 없는 요청 — 로그인, 회원가입, 토큰 재발급
export const publicInstance = axios.create(BASE_CONFIG);

// 토큰이 필요한 요청 — 헤더 자동 첨부, 401이면 재발급 후 재시도
export const authInstance = axios.create(BASE_CONFIG);

authInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let reissuePromise: Promise<string> | null = null;

const reissueAccessToken = async () => {
  const { refreshToken } = useAuthStore.getState();
  if (!refreshToken) return null;

  reissuePromise ??= publicInstance
    .post<ApiResponse<AuthTokenResponse>>("/auth/reissue", { refreshToken })
    .then((response) => {
      const tokens = response.data.data;
      useAuthStore.getState().setTokens(tokens);

      return tokens.accessToken;
    })
    .finally(() => {
      reissuePromise = null;
    });

  return reissuePromise.catch(() => null);
};

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originRequest = error.config;

    if (status === 401 && originRequest) {
      if (!originRequest.isRetried) {
        originRequest.isRetried = true;

        const accessToken = await reissueAccessToken();
        if (accessToken) {
          originRequest.headers.Authorization = `Bearer ${accessToken}`;
          return authInstance(originRequest);
        }
      }

      useAuthStore.getState().clearAuth();

      if (window.location.pathname !== PATH.LOGIN) {
        window.location.replace(PATH.LOGIN);
      }
    }

    return Promise.reject(error);
  }
);
