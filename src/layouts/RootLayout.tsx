import { Outlet } from "react-router";

import { useForegroundPushToast } from "@/hooks/useForegroundPushToast";

export function RootLayout() {
  useForegroundPushToast();

  return (
    <div className="mx-auto flex h-dvh w-full max-w-107.5 min-w-80 flex-col bg-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-md">
      <Outlet />
    </div>
  );
}
