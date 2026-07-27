import { isAxiosError } from "axios";

import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import type { ApiErrorResponse, ApiFieldErrors } from "@/types/api";

// 서버가 내려준 에러 메시지, 비어 있으면 화면별 기본 문구
export const getApiErrorMessage = (
  error: unknown,
  fallback: string = API_ERROR_MESSAGE.DEFAULT
) => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message?.trim() || fallback;
  }

  return fallback;
};

// 필드 단위 검증 에러 — 폼 입력에 매핑
export const getApiFieldErrors = (error: unknown): ApiFieldErrors => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.data?.fieldErrors ?? {};
  }

  return {};
};
