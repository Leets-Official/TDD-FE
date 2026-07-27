export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 필드명 → 검증 실패 메시지
export type ApiFieldErrors = Record<string, string>;

export interface ApiErrorResponse {
  success: false;
  message: string;
  data?: {
    fieldErrors?: ApiFieldErrors;
  };
}
