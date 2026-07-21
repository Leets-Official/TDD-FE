import type { PwaPlatform } from "@/types/pwa";

export function isPwaInstalled(): boolean {
  const isStandaloneDisplay =
    typeof window !== "undefined" &&
    window.matchMedia?.("(display-mode: standalone)").matches;

  // iOS Safari는 display-mode 대신 navigator.standalone로 노출
  const isIosStandalone =
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

  return Boolean(isStandaloneDisplay || isIosStandalone);
}

export function getPwaPlatform(): PwaPlatform {
  if (typeof navigator === "undefined") return "other";

  const ua = navigator.userAgent;

  // iPadOS 13+는 UA에 "iPad"가 없고 Mac으로 위장하므로 터치 포인트로 보정
  const isIos =
    /iphone|ipad|ipod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIos) return "ios";

  if (/android/i.test(ua)) return "android";

  return "other";
}
