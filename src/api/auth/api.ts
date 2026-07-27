import { authInstance, publicInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type { AuthTokenResponse, LoginRequest } from "@/types/auth/auth";

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
