import { Outlet } from "react-router";

import { useForegroundPushToast } from "@/hooks/useForegroundPushToast";

export function RootLayout() {
  useForegroundPushToast();

  return (
    <div className="mx-auto flex h-dvh w-full max-w-107.5 min-w-0 flex-col bg-white shadow-md">
      <Outlet />
    </div>
  );
}
