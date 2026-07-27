// 메세지 조회 API 타입
export type ChatMessageType =
  | "USER"
  | "IMAGE"
  | "DELIVERY_ARRIVED"
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
