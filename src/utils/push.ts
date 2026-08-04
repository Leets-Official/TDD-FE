import type { PushSubscriptionRequest } from "@/types/notification/notification";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

function getVapidPublicKey(): string {
  if (!VAPID_PUBLIC_KEY) {
    throw new Error("VITE_VAPID_PUBLIC_KEY is missing.");
  }

  return VAPID_PUBLIC_KEY;
}

// 키가 없으면 구독 자체가 불가능하므로 미지원과 같이 취급합니다
export function isPushSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window &&
    Boolean(VAPID_PUBLIC_KEY)
  );
}

// 권한이 없으면 서버 설정과 무관하게 알림이 오지 않습니다
export function isPushPermissionGranted(): boolean {
  return isPushSupported() && Notification.permission === "granted";
}

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (Notification.permission === "granted") return Promise.resolve("granted");

  return Notification.requestPermission();
}

// VAPID 키를 subscribe에 넘기기 전 바이트 배열로 변환
function urlBase64ToUint8Array(base64Url: string) {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");

  return Uint8Array.from(window.atob(base64), (char) => char.charCodeAt(0));
}

// 구독 키를 패딩 없는 base64url 문자열로 변환
function encodeSubscriptionKey(key: ArrayBuffer | null) {
  if (!key) return "";

  const binary = String.fromCharCode(...new Uint8Array(key));

  return window
    .btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function subscribeToPush(): Promise<PushSubscriptionRequest> {
  const registration = await navigator.serviceWorker.ready;

  // 이미 구독되어 있는 경우 재사용
  const subscription =
    (await registration.pushManager.getSubscription()) ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(getVapidPublicKey()),
    }));

  return {
    endpoint: subscription.endpoint,
    p256dhKey: encodeSubscriptionKey(subscription.getKey("p256dh")),
    authKey: encodeSubscriptionKey(subscription.getKey("auth")),
  };
}
