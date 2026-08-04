import type { ChatMessage, ChatMessageHistoryItem } from "@/types/order/chat";

// 메시지 내역 조회 API 응답에는 senderNickname이 없어 senderId로 임시 대체
// TODO: 백엔드 응답에 senderNickname 필드가 추가되면 이 폴백 제거
export function toChatMessage(item: ChatMessageHistoryItem): ChatMessage {
  return {
    ...item,
    senderNickname: String(item.senderId),
  };
}
