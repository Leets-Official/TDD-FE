import { useEffect } from "react";
import { generatePath, useNavigate } from "react-router";

import { PATH } from "@/routes/paths";

import { useToast } from "./useToast";

// 메시지 타입
interface PushNotificationMessage {
  type: "push-notification";
  title: string;
  body: string;
  url: string;
}

function isPushNotificationMessage(
  data: unknown
): data is PushNotificationMessage {
  return (
    typeof data === "object" &&
    data !== null &&
    (data as { type?: unknown }).type === "push-notification"
  );
}

// 백엔드가 url로 /parties/{id}를 내려주는데, 모집마감 알림은 상세가 아니라 채팅방으로 보내야 해서 id만 뽑음
function extractPartyId(url: string): string | null {
  const match = /^\/parties\/(\d+)$/.exec(url);
  return match?.[1] ?? null;
}

// 백엔드 WebPushPayload에 이벤트 타입 필드가 없어서 title 문자열로 판별함
const RECRUITMENT_CLOSED_TITLE = "배달팟 모집이 마감되었어요";

// 앱이 켜져 있는 동안 도착한 웹푸시를 인앱 토스트로도 보여준다 (OS 알림 배너와는 별개)
export function useForegroundPushToast() {
  const navigate = useNavigate();
  const { openToast } = useToast();

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (!isPushNotificationMessage(event.data)) return;

      const { title, body, url } = event.data;
      const isRecruitmentClosed = title === RECRUITMENT_CLOSED_TITLE;
      const partyId = extractPartyId(url);

      openToast({
        message: isRecruitmentClosed
          ? "배달팟이 매칭되었습니다!"
          : body || title,
        ...(isRecruitmentClosed &&
          partyId && {
            actionLabel: "채팅방 입장",
            onActionClick: () =>
              navigate(generatePath(PATH.ORDER_CHAT, { orderId: partyId })),
          }),
      });
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () =>
      navigator.serviceWorker.removeEventListener("message", handleMessage);
  }, [navigate, openToast]);
}
