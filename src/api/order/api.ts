import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  PartyDetail,
  PartyListItem,
  PartyListParams,
  PartyParticipants,
} from "@/types/order/order";

// 배달팟 목록 조회 API
export const getPartyList = async (params?: PartyListParams) => {
  const { data } = await authInstance.get<
    ApiResponse<{ parties: PartyListItem[] }>
  >("/delivery-parties", { params });

  return data.data.parties;
};

// 배달팟 상세 조회 API
export const getPartyDetail = async (partyId: number) => {
  const { data } = await authInstance.get<PartyDetail>(
    `/delivery-parties/${partyId}`
  );

  return data;
};

// 배달팟 참여자 목록 API
export const getPartyParticipants = async (partyId: number) => {
  const { data } = await authInstance.get<ApiResponse<PartyParticipants>>(
    `/delivery-parties/${partyId}/participants`
  );

  return data.data;
};
