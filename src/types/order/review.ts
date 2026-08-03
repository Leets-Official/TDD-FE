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
