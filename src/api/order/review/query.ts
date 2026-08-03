import { useQuery } from "@tanstack/react-query";

import { getPartyReviewTargets } from "@/api/order/review/api";

// 매너 평가 대상 목록 조회 API
export const usePartyReviewTargets = (partyId: number) =>
  useQuery({
    queryKey: ["parties", partyId, "review-targets"],
    queryFn: () => getPartyReviewTargets(partyId),
    enabled: Number.isFinite(partyId),
  });
