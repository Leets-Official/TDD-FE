import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="mx-auto flex h-dvh max-w-[393px] flex-col bg-white shadow-md">
      <Outlet />
    </div>
  );
}
