import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  PartyReviewTargets,
  PostReviewRequest,
  PostReviewResult,
} from "@/types/order/review";

// 매너 평가 대상 목록 조회 API
export const getPartyReviewTargets = async (partyId: number) => {
  const { data } = await authInstance.get<ApiResponse<PartyReviewTargets>>(
    `/parties/${partyId}/review-targets`
  );

  return data.data;
};

// 매너 평가 등록 API
export const postPartyReview = async ({
  partyId,
  body,
}: {
  partyId: number;
  body: PostReviewRequest;
}) => {
  const { data } = await authInstance.post<ApiResponse<PostReviewResult>>(
    `/parties/${partyId}/reviews`,
    body
  );

  return data.data;
};
