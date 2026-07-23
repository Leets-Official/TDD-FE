export type DormVerificationStatus =
  "NONE" | "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export interface DormVerification {
  status: DormVerificationStatus;
  expiresAt?: string;
  rejectReason?: string;
}
