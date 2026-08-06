import { Outlet } from "react-router";

import { useKeyboardInset } from "@/hooks/useKeyboardInset";
import { useForegroundPushToast } from "@/hooks/useForegroundPushToast";

export function RootLayout() {
  useKeyboardInset();
  useForegroundPushToast();

  return (
    <div className="mx-auto flex h-[var(--app-viewport-height,100dvh)] w-full max-w-107.5 min-w-80 flex-col bg-white pt-[env(safe-area-inset-top)] pb-[var(--app-safe-area-bottom,env(safe-area-inset-bottom))] shadow-md">
      <Outlet />
    </div>
  );
}
