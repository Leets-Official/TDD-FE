export const NOTIFICATION_ITEMS = [
  { key: "party", title: "배달 팟 알림" },
  { key: "chat", title: "채팅 알림" },
  { key: "board", title: "게시판 알림" },
] as const;

export type NotificationKey = (typeof NOTIFICATION_ITEMS)[number]["key"];
