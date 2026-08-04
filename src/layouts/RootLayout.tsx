import { Outlet } from "react-router";

import { useKeyboardInset } from "@/hooks/useKeyboardInset";

export function RootLayout() {
  useKeyboardInset();

  return (
    <div className="mx-auto flex h-dvh w-full max-w-107.5 min-w-80 flex-col bg-white shadow-md">
      <Outlet />
    </div>
  );
}
