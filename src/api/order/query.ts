import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelParty,
  closeParty,
  completeParty,
  createParty,
  getMyPartyList,
  getPartyDetail,
  getPartyList,
  getPartyParticipants,
  joinParty,
  leaveParty,
  orderParty,
  settleParty,
} from "@/api/order/api";
import type { MyPartyListParams, PartyListParams } from "@/types/order/order";

// 배달팟 목록 조회 API
export const usePartyList = (params?: PartyListParams) =>
  useQuery({
    queryKey: ["parties", params],
    queryFn: () => getPartyList(params),
  });

// 내 배달팟 목록 조회 API
export const useMyPartyList = (params?: MyPartyListParams) =>
  useQuery({
    queryKey: ["parties", "me", params],
    queryFn: () => getMyPartyList(params),
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

// 배달팟 참여 취소 API
export const useLeaveParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveParty,
    onSuccess: (_, partyId) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};

// 배달팟 모집 마감 API
export const useCloseParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: closeParty,
    onSuccess: (_, partyId) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};

// 배달팟 주문 완료 API
export const useOrderParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderParty,
    onSuccess: (_, partyId) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};

// 배달팟 배달 완료 API
export const useCompleteParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeParty,
    onSuccess: (_, partyId) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};

// 배달팟 MVP 정산 완료 API
export const useSettleParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settleParty,
    onSuccess: (_, partyId) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};
