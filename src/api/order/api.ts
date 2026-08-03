import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  CreatePartyRequest,
  MyPartyListParams,
  PartyCancelResult,
  PartyCloseResult,
  PartyCompleteResult,
  PartyCreateResult,
  PartyDetail,
  PartyJoinResult,
  PartyLeaveResult,
  PartyListItem,
  PartyListParams,
  PartyOrderResult,
  PartyParticipants,
} from "@/types/order/order";

// 배달팟 목록 조회 API
export const getPartyList = async (params?: PartyListParams) => {
  const { data } = await authInstance.get<
    ApiResponse<{ parties: PartyListItem[] }>
  >("/delivery-parties", { params });

  return data.data.parties;
};

// 내 배달팟 목록 조회 API
export const getMyPartyList = async (params?: MyPartyListParams) => {
  const { data } = await authInstance.get<
    ApiResponse<{ parties: PartyListItem[] }>
  >("/delivery-parties/me", { params });

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

// 배달팟 취소(모집 취소) API
export const cancelParty = async (partyId: number) => {
  const { data } = await authInstance.delete<ApiResponse<PartyCancelResult>>(
    `/delivery-parties/${partyId}`
  );

  return data.data;
};

// 배달팟 생성 API
export const createParty = async (body: CreatePartyRequest) => {
  const { data } = await authInstance.post<PartyCreateResult>(
    "/delivery-parties",
    body
  );

  return data;
};

// 배달팟 참여 API
export const joinParty = async (partyId: number) => {
  const { data } = await authInstance.post<ApiResponse<PartyJoinResult>>(
    `/delivery-parties/${partyId}/join`
  );

  return data.data;
};

// 배달팟 참여 취소 API
export const leaveParty = async (partyId: number) => {
  const { data } = await authInstance.delete<ApiResponse<PartyLeaveResult>>(
    `/delivery-parties/${partyId}/participants`
  );

  return data.data;
};

// 배달팟 모집 마감 API
export const closeParty = async (partyId: number) => {
  const { data } = await authInstance.patch<ApiResponse<PartyCloseResult>>(
    `/delivery-parties/${partyId}/close`
  );

  return data.data;
};

// 배달팟 주문 완료 API
export const orderParty = async (partyId: number) => {
  const { data } = await authInstance.patch<ApiResponse<PartyOrderResult>>(
    `/delivery-parties/${partyId}/order`
  );

  return data.data;
};

// 배달팟 배달 완료 API
export const completeParty = async (partyId: number) => {
  const { data } = await authInstance.patch<ApiResponse<PartyCompleteResult>>(
    `/delivery-parties/${partyId}/complete`
  );

  return data.data;
};
