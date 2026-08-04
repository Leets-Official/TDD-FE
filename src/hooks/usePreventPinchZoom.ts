import { useEffect } from "react";

// iOS 사파리는 user-scalable=no를 무시해서, 핀치 줌을 막으려면 제스처 이벤트를 직접 취소해야 합니다
export function usePreventPinchZoom() {
  useEffect(() => {
    const preventGesture = (event: Event) => event.preventDefault();

    document.addEventListener("gesturestart", preventGesture);
    document.addEventListener("gesturechange", preventGesture);
    document.addEventListener("gestureend", preventGesture);

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);
}
