import type { DormVerificationStatus } from "@/types/dormVerification";

export type AccountStatus = "ACTIVE" | "SUSPENDED";

export interface MypageProfile {
  nickname: string;
  profileImageUrl: string | null;
  mannerTemperature: number;
  noShowApprovedCount: number;
  suspendedUntil: string | null;
  status: AccountStatus;
  dormitory: string | null;
  dormStatus: DormVerificationStatus;
  dormVerifiedAt: string | null;
  dormVerifiedUntil: string | null;
}

export const mockMypageSuspended: MypageProfile = {
  nickname: "가나디",
  profileImageUrl: "https://i.pravatar.cc/150?img=5",
  mannerTemperature: 36.5,
  noShowApprovedCount: 3,
  suspendedUntil: "2026-07-31T23:59:59",
  status: "SUSPENDED",
  dormitory: "1동",
  dormStatus: "APPROVED",
  dormVerifiedAt: "2026-03-31T23:59:59",
  dormVerifiedUntil: "2026-08-31T23:59:59",
};
