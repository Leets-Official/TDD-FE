import type { DormitoryValue } from "@/constants/dormitory";
import type { DormVerificationStatus } from "@/types/dormVerification";

export type AccountStatus = "ACTIVE" | "SUSPENDED";

export interface MyPageProfile {
  nickname: string;
  profileImageUrl: string | null;
  mannerTemperature: number;
  noShowApprovedCount: number;
  suspendedUntil: string | null;
  status: AccountStatus;
  dormitory: DormitoryValue | null;
  dormStatus: DormVerificationStatus;
  dormVerifiedAt: string | null;
  dormVerifiedUntil: string | null;
}

export const mockMyPageSuspended: MyPageProfile = {
  nickname: "가나디",
  profileImageUrl: "https://i.pravatar.cc/150?img=5",
  mannerTemperature: 36.5,
  noShowApprovedCount: 3,
  suspendedUntil: "2026-07-31T23:59:59",
  status: "SUSPENDED",
  dormitory: "1기숙사",
  dormStatus: "APPROVED",
  dormVerifiedAt: "2026-03-31T23:59:59",
  dormVerifiedUntil: "2026-08-31T23:59:59",
};
