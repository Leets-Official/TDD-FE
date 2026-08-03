import { postPushSubscription } from "@/api/notification/api";
import {
  isPushSupported,
  requestNotificationPermission,
  subscribeToPush,
} from "@/utils/push";

// 로그인·회원가입 직후 알림 권한 호출
export async function ensurePushSubscription() {
  if (!isPushSupported()) return;

  try {
    // 이미 차단했다면 팝업 없이 denied가 바로 돌아옵니다
    if ((await requestNotificationPermission()) !== "granted") return;

    await postPushSubscription(await subscribeToPush());
  } catch (error) {
    // 구독 등록 실패가 로그인 흐름을 막지 않도록 삼키되 원인은 남깁니다
    if (import.meta.env.DEV) {
      console.error("푸시 구독 등록 실패", error);
    }
  }
}
