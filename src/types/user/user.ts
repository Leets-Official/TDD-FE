import type { DormitoryValue } from "@/constants/dormitory";
import type { AuthTokenResponse } from "@/types/auth/auth";

export interface SignupRequest {
  email: string;
  password: string;
  nickname?: string;
  dormitory?: DormitoryValue | "";
}

export interface SignupResponse extends AuthTokenResponse {
  nickname: string;
  dormitory: string;
}
