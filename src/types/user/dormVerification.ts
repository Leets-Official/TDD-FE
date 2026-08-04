export type DormVerificationStatus =
  "NOT_SUBMITTED" | "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";

export interface DormVerificationUploadResponse {
  dorm_status: DormVerificationStatus;
  dorm_verified_at?: string;
  dorm_verified_until?: string;
  dorm_verified_image_url?: string;
}
