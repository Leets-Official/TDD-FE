export type DormVerificationStatus =
  "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export interface DormVerification {
  status: DormVerificationStatus;
  expiresAt?: string;
  rejectReason?: string;
}
