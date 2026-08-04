export interface PushSetting {
  pushEnabled: boolean;
}

export type PushCategory = "POT" | "CHAT" | "BOARD";

// 서버가 푸시 본문으로 보내는 JSON
export interface PushPayload {
  title?: string;
  body?: string;
  category?: PushCategory;
  url?: string;
}

export interface PushSubscriptionRequest {
  endpoint: string;
  p256dhKey: string;
  authKey: string;
}
