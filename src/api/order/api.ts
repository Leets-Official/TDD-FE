import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type { PartyListItem, PartyListParams } from "@/types/order/order";

// 배달팟 목록 조회 API
export const getPartyList = async (params?: PartyListParams) => {
  const { data } = await authInstance.get<
    ApiResponse<{ parties: PartyListItem[] }>
  >("/delivery-parties", { params });

  return data.data.parties;
};
