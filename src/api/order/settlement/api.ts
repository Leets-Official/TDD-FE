import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  CreateSettlementRequest,
  SettlementDetail,
} from "@/types/order/settlement";

// 정산 요청 생성 API
export const requestSettlement = async (
  partyId: number,
  body: CreateSettlementRequest
) => {
  const { data } = await authInstance.post<ApiResponse<SettlementDetail>>(
    `/parties/${partyId}/settlement`,
    body
  );

  return data.data;
};
