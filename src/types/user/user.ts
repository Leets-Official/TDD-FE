import type { DormitoryValue } from "@/constants/dormitory";
import type { AuthTokenResponse } from "@/types/auth/auth";
import type { DormVerificationStatus } from "@/types/dormVerification";

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

export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface MyPageResponse {
  nickname: string;
  profileImageUrl?: string;
  mannerTemperature: number;
  noShowApprovedCount: number;
  status: UserStatus;
  suspendedUntil?: string;
  dormitory?: DormitoryValue;
  dormStatus: DormVerificationStatus;
  dormVerifiedAt?: string;
  dormVerifiedUntil?: string;
  rejectReason?: string;
}

export interface ProfileUpdateRequest {
  nickname: string;
  dormitory: DormitoryValue;
  profileImageUrl?: "";
}

export interface ProfileUpdateResponse {
  nickname: string;
  dormitory: string;
  profileImageUrl?: string;
}

export interface ProfileImageUploadResponse {
  profile_image_url: string;
}
