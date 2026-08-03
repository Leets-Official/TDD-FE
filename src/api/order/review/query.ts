import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getPartyReviewTargets,
  postPartyReport,
  postPartyReview,
} from "@/api/order/review/api";

// 매너 평가 대상 목록 조회 API
export const usePartyReviewTargets = (partyId: number) =>
  useQuery({
    queryKey: ["parties", partyId, "review-targets"],
    queryFn: () => getPartyReviewTargets(partyId),
    enabled: Number.isFinite(partyId),
  });

// 매너 평가 등록 API
export const usePostPartyReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPartyReview,
    onSuccess: (_, { partyId }) => {
      queryClient.invalidateQueries({
        queryKey: ["parties", partyId, "review-targets"],
      });
    },
  });
};

// 신고 등록 API
export const usePostPartyReport = () =>
  useMutation({
    mutationFn: postPartyReport,
  });
