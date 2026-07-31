import { useQuery } from "@tanstack/react-query";

import {
  getPartyDetail,
  getPartyList,
  getPartyParticipants,
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
