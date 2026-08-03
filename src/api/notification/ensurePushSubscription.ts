import { postPushSubscription } from "@/api/notification/api";
import { isPushSupported, subscribeToPush } from "@/utils/push";

// 로그인·회원가입 직후 알림 권한 호출
export async function ensurePushSubscription() {
  if (!isPushSupported() || Notification.permission === "denied") return;

  try {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;
    }

    await postPushSubscription(await subscribeToPush());
  } catch {
    // 구독 등록 실패가 로그인 흐름을 막지 않도록 삼킵니다
  }
}
