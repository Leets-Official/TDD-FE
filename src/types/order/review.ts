// 매너 평가 대상 목록 조회 API
export interface ReviewTarget {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  reviewed: boolean;
}

export interface PartyReviewTargets {
  partyId: number;
  targets: ReviewTarget[];
}

// 매너 평가 등록 API
export interface PostReviewRequest {
  revieweeId: number;
  rating: 1 | 5;
  tagIds?: number[];
  content?: string;
}

export interface PostReviewResult {
  reviewId: number;
  partyId: number;
  revieweeId: number;
  rating: number;
  tagIds: number[];
  content: string;
  createdAt: string;
}

// 신고 등록 API
export type ReportReason =
  | "NO_SHOW"
  | "ABUSIVE_LANGUAGE"
  | "UNPLEASANT_CHAT"
  | "PERSONAL_INFO_DEMAND"
  | "ETC";

export interface PostReportRequest {
  reportedUserId: number;
  reason: ReportReason;
  content?: string;
}

export interface PostReportResult {
  reportId: number;
  partyId: number;
  reportedUserId: number;
  reason: ReportReason;
  status: string;
  createdAt: string;
}
