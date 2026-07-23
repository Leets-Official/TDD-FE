import { CURRENT_USER_ID } from "@/constants/order/chat";
import type { ChatMessage } from "@/types/order/chat";

export const DUMMY_CHAT: ChatMessage[] = [
  {
    messageId: 1,
    messageType: "USER",
    senderId: 2,
    senderNickname: "닉네임",
    content: "안녕하세요",
    imageUrl: null,
    createdAt: "2026-07-22T18:30:00",
  },
  {
    messageId: 2,
    senderId: CURRENT_USER_ID,
    messageType: "USER",
    senderNickname: "나",
    content: "안녕하세요",
    imageUrl: null,
    createdAt: "2026-07-22T18:30:00",
  },
  {
    messageId: 3,
    messageType: "USER",
    senderId: 2,
    senderNickname: "닉네임",
    content: "안녕하세요",
    imageUrl: null,
    createdAt: "2026-07-22T18:30:00",
  },
  {
    messageId: 4,
    messageType: "USER",
    senderId: 3,
    senderNickname: "치킨러버",
    content: "안녕하세요",
    imageUrl: null,
    createdAt: "2026-07-22T18:30:00",
  },
];
