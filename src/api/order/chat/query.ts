import { useQuery } from "@tanstack/react-query";

import { getChatMessages, getChatRoomInfo } from "@/api/order/chat/api";
import type { ChatMessageHistoryParams } from "@/types/order/chat";

// 메시지 내역 조회 API
export const useChatMessageHistory = (
  partyId: number,
  params?: ChatMessageHistoryParams
) =>
  useQuery({
    queryKey: ["parties", partyId, "chat", "messages", params],
    queryFn: () => getChatMessages(partyId, params),
    enabled: Number.isFinite(partyId),
  });

// 채팅방 정보 조회 API
export const useChatRoomInfo = (partyId: number) =>
  useQuery({
    queryKey: ["parties", partyId, "chat", "room"],
    queryFn: () => getChatRoomInfo(partyId),
    enabled: Number.isFinite(partyId),
  });
