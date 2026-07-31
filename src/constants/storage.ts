// 인증 완료된 이메일 임시 보관 — 인증 정리 시 clearAuth에서 함께 삭제
export const VERIFIED_EMAIL_KEY = {
  SIGNUP: "signup-verified-email",
  PASSWORD_RESET: "password-reset-verified-email",
} as const;
