import { authInstance, publicInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  AuthTokenResponse,
  LoginRequest,
  ResetPasswordRequest,
  SendEmailCodeRequest,
  VerifyEmailCodeRequest,
} from "@/types/auth/auth";

export const login = async (body: LoginRequest) => {
  const { data } = await publicInstance.post<ApiResponse<AuthTokenResponse>>(
    "/auth/login",
    body
  );

  return data.data;
};

export const logout = async () => {
  await authInstance.post<ApiResponse<string>>("/auth/logout");
};

export const postSendEmailCode = async (body: SendEmailCodeRequest) => {
  await publicInstance.post<ApiResponse<null>>("/auth/email/send-code", body);
};

export const postVerifyEmailCode = async (body: VerifyEmailCodeRequest) => {
  await publicInstance.post<ApiResponse<null>>("/auth/email/verify-code", body);
};

export const patchPasswordReset = async (body: ResetPasswordRequest) => {
  await publicInstance.patch<ApiResponse<null>>("/auth/password-reset", body);
};
