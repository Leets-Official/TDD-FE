export interface LoginRequest {
  email: string;
  password: string;
}

export type EmailCodePurpose = "SIGNUP" | "RESET_PASSWORD";

export interface SendEmailCodeRequest {
  email: string;
  purpose: EmailCodePurpose;
}

export interface VerifyEmailCodeRequest {
  email: string;
  code: string;
  purpose?: EmailCodePurpose;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
