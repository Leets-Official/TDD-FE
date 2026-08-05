import type { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef } from "react";

import {
  chatPublishDestination,
  createChatStompClient,
} from "@/api/stompClient";
import { useAuthStore } from "@/stores/useAuthStore";
import type { ChatMessage, ChatSendMessagePayload } from "@/types/order/chat";

interface UseChatSocketParams {
  partyId: number;
  onMessage: (message: ChatMessage) => void;
}

// 채팅방 WebSocket 연결/구독/전송
export function useChatSocket({ partyId, onMessage }: UseChatSocketParams) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const onMessageRef = useRef(onMessage);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    // accessToken이 아직 없으면(로그인 스토어 rehydrate 전 등) 인증 실패가 뻔한 연결을 시도하지 않는다
    if (!Number.isFinite(partyId) || !accessToken) return;

    const client = createChatStompClient({
      partyId,
      accessToken,
      onMessage: (message) => {
        try {
          onMessageRef.current(JSON.parse(message.body) as ChatMessage);
        } catch (e) {
          console.error("[chat] 파싱 실패:", e, message.body);
        }
      },
    });

    client.onStompError = (frame) => {
      console.error("[chat] STOMP 에러 프레임:", frame.headers, frame.body);
    };
    client.onWebSocketError = (event) => {
      console.error("[chat] WebSocket 에러:", event);
    };

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [partyId, accessToken]);

  // 연결되어 있지 않으면 전송하지 않고 false를 반환한다
  const sendMessage = useCallback(
    (payload: ChatSendMessagePayload) => {
      const client = clientRef.current;
      if (!client?.connected) return false;

      client.publish({
        destination: chatPublishDestination(partyId),
        body: JSON.stringify(payload),
      });
      return true;
    },
    [partyId]
  );

  return { sendMessage };
}
