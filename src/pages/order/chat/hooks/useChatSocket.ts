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
    if (!Number.isFinite(partyId)) return;

    const client = createChatStompClient({
      partyId,
      accessToken,
      onMessage: (message) => {
        console.log("[chat] 수신:", message.body);
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
    client.onWebSocketClose = (event) => {
      console.warn("[chat] WebSocket 종료:", event.code, event.reason);
    };
    client.onWebSocketError = (event) => {
      console.error("[chat] WebSocket 에러:", event);
    };
    client.onDisconnect = (frame) => {
      console.warn("[chat] STOMP 연결 해제:", frame.headers);
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

      console.log("[chat] PUB 전송:", chatPublishDestination(partyId), payload);
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
