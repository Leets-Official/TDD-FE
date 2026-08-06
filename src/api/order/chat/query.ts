import { useQuery } from "@tanstack/react-query";

import { getChatMessages, getChatRoomInfo } from "@/api/order/chat/api";
import type { ChatMessageHistoryParams } from "@/types/order/chat";

// 메시지 내역 조회 API
// imageUrl이 5분짜리 presigned URL이라, 채팅방을 오래 켜둬도 만료되지 않도록 주기적으로 재조회
export const useChatMessageHistory = (
  partyId: number,
  params?: ChatMessageHistoryParams
) =>
  useQuery({
    queryKey: ["parties", partyId, "chat", "messages", params],
    queryFn: () => getChatMessages(partyId, params),
    enabled: Number.isFinite(partyId),
    refetchInterval: 4 * 60 * 1000,
  });

// 채팅방 정보 조회 API
export const useChatRoomInfo = (partyId: number) =>
  useQuery({
    queryKey: ["parties", partyId, "chat", "room"],
    queryFn: () => getChatRoomInfo(partyId),
    enabled: Number.isFinite(partyId),
  });
