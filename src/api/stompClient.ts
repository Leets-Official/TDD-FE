import { Client, type IMessage } from "@stomp/stompjs";

const WS_URL: string = `${import.meta.env.VITE_WS_URL}/ws`;

export const chatTopicDestination = (partyId: number) =>
  `/topic/parties/${partyId}/chat`;

export const chatPublishDestination = (partyId: number) =>
  `/app/parties/${partyId}/chat`;

interface CreateChatStompClientParams {
  partyId: number;
  accessToken: string | null;
  onMessage: (message: IMessage) => void;
}

export const createChatStompClient = ({
  partyId,
  accessToken,
  onMessage,
}: CreateChatStompClientParams) => {
  const client = new Client({
    webSocketFactory: () => new WebSocket(WS_URL),

    connectHeaders: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {},
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = () => {
    client.subscribe(chatTopicDestination(partyId), onMessage);
  };

  return client;
};
