import { useEffect, useRef } from "react";

import { createChatStompClient } from "@/api/stompClient";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ChatMessage } from "@/types/order/chat";

interface UseChatSocketParams {
  partyId: number;
  onMessage: (message: ChatMessage) => void;
}

// 채팅방 WebSocket 연결/구독 (수신 전용, 전송은 useChatMessages에서 별도 처리)
export function useChatSocket({ partyId, onMessage }: UseChatSocketParams) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!Number.isFinite(partyId)) return;

    const client = createChatStompClient({
      partyId,
      accessToken,
      onMessage: (message) => {
        try {
          onMessageRef.current(JSON.parse(message.body) as ChatMessage);
        } catch {
          // 파싱 실패한 메시지는 무시
        }
      },
    });

    client.onStompError = (frame) => {
      console.error("STOMP 연결 오류:", frame.headers.message);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [partyId, accessToken]);
}
