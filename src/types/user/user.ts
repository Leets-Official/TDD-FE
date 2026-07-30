import type { DormitoryValue } from "@/constants/dormitory";
import type { AuthTokenResponse } from "@/types/auth/auth";

export interface SignupRequest {
  email: string;
  password: string;
  // 생략하면 서버가 닉네임을 자동 배정합니다.
  nickname?: string;
  // 건너뛰면 생략, 빈 문자열도 미선택으로 처리됩니다.
  dormitory?: DormitoryValue | "";
}

export interface SignupResponse extends AuthTokenResponse {
  nickname: string;
  dormitory: string;
}
