import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  ChatMessageHistoryItem,
  ChatMessageHistoryParams,
  ChatRoomInfo,
} from "@/types/order/chat";

// 메시지 내역 조회 API
export const getChatMessages = async (
  partyId: number,
  params?: ChatMessageHistoryParams
) => {
  const { data } = await authInstance.get<
    ApiResponse<ChatMessageHistoryItem[]>
  >(`/parties/${partyId}/chat/messages`, { params });

  return data.data;
};

// 채팅방 정보 조회 API
export const getChatRoomInfo = async (partyId: number) => {
  const { data } = await authInstance.get<ApiResponse<ChatRoomInfo>>(
    `/parties/${partyId}/chat`
  );

  return data.data;
};
