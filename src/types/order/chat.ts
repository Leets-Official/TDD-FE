// 메세지 조회 API 타입
export type ChatMessageType =
  | "USER"
  | "IMAGE"
  | "ORDER_COMPLETED" // 주문 완료
  | "DELIVERY_ARRIVED"
  | "DELIVERY_ARRIVED_CANCEL"
  | "SETTLEMENT_REQUEST"
  | "TRANSFER_REQUEST"
  | "REVIEW_PROMPT";

export interface ChatMessage {
  messageId: number;
  messageType: ChatMessageType;
  senderId: number;
  senderNickname: string;
  content: string | null;
  imageUrl: string | null;
  createdAt: string;
}

// 메시지 내역 조회 API 쿼리 파라미터
export interface ChatMessageHistoryParams {
  size?: number;
}

// 채팅방 정보 조회 API 응답
export interface ChatRoomInfo {
  chatRoomId: number;
  partyId: number;
  createdAt: string;
}

// 클라이언트가 직접 발행(PUB) 가능한 메시지 타입.
// DELIVERY_ARRIVED PUB 시 이후 연결이 끊기는 것을 2회 재현 확인 — 백엔드 버그로 보고, 제외함.
export type ChatSendableMessageType = "USER" | "IMAGE";

// 메시지 전송(PUB) 요청 바디. senderId는 서버가 JWT로 식별하므로 포함하지 않는다.
export interface ChatSendMessagePayload {
  messageType: ChatSendableMessageType;
  content: string | null;
  imageUrl: string | null;
}
