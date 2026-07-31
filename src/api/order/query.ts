import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelParty,
  createParty,
  getPartyDetail,
  getPartyList,
  getPartyParticipants,
  joinParty,
} from "@/api/order/api";
import type { PartyListParams } from "@/types/order/order";

// 배달팟 목록 조회 API
export const usePartyList = (params?: PartyListParams) =>
  useQuery({
    queryKey: ["parties", params],
    queryFn: () => getPartyList(params),
  });

// 배달팟 상세 조회 API
export const usePartyDetail = (partyId: number) =>
  useQuery({
    queryKey: ["parties", partyId],
    queryFn: () => getPartyDetail(partyId),
    enabled: Number.isFinite(partyId),
  });

// 배달팟 참여자 목록 API
export const usePartyParticipants = (partyId: number) =>
  useQuery({
    queryKey: ["parties", partyId, "participants"],
    queryFn: () => getPartyParticipants(partyId),
    enabled: Number.isFinite(partyId),
  });

// 배달팟 취소(모집 취소) API
export const useCancelParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelParty,
    onSuccess: (_, partyId) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};

// 배달팟 생성 API
export const useCreateParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createParty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
    },
  });
};

// 배달팟 참여 API
export const useJoinParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinParty,
    onSuccess: (_, partyId) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};
