import { publicInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type { SignupRequest, SignupResponse } from "@/types/user/user";

export const postSignup = async (body: SignupRequest) => {
  const { data } = await publicInstance.post<ApiResponse<SignupResponse>>(
    "/users/me",
    body
  );

  return data.data;
};
