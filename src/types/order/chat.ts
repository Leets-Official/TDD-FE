// 메세지 조회 API 타입
// ORDER_COMPLETED는 아직 백엔드 enum에 없는 FE 임시 타입
// (다른 멤버에게는 실시간으로 안 보임).
export type ChatMessageType =
  | "USER"
  | "IMAGE"
  | "ORDER_COMPLETED"
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

// 메시지 내역 조회 API 응답
export interface ChatMessageHistoryItem {
  messageId: number;
  messageType: ChatMessageType;
  senderId: number;
  // senderNickname: string;
  content: string | null;
  imageUrl: string | null;
  createdAt: string;
}

// 채팅방 정보 조회 API 응답
export interface ChatRoomInfo {
  chatRoomId: number;
  partyId: number;
  createdAt: string;
}

// 클라이언트가 직접 발행(PUB) 가능한 메시지 타입.
// DELIVERY_ARRIVED/SETTLEMENT_REQUEST 등 시스템 메시지는 클라이언트가 PUB하지 않고
// 관련 REST API(정산 요청 등) 호출의 부수효과로 백엔드가 발행한다.
export type ChatSendableMessageType = "USER" | "IMAGE";

// 메시지 전송(PUB) 요청 바디. senderId는 서버가 JWT로 식별하므로 포함하지 않는다.
export interface ChatSendMessagePayload {
  messageType: ChatSendableMessageType;
  content: string | null;
  imageUrl: string | null;
}
