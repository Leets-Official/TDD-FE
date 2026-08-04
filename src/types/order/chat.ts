// 메세지 조회 API 타입
export type ChatMessageType =
  | "USER"
  | "IMAGE"
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
