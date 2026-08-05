import { Outlet } from "react-router";

import { useKeyboardInset } from "@/hooks/useKeyboardInset";
import { useForegroundPushToast } from "@/hooks/useForegroundPushToast";

export function RootLayout() {
  useKeyboardInset();
  useForegroundPushToast();

  // iOS는 키보드가 떠도 dvh가 그대로라, 키보드 높이만큼 줄여 레이아웃을 visual viewport에 맞춥니다
  return (
    <div className="mx-auto flex h-[calc(100dvh-var(--keyboard-inset,0px))] w-full max-w-107.5 min-w-80 flex-col bg-white shadow-md">
      <Outlet />
    </div>
  );
}
