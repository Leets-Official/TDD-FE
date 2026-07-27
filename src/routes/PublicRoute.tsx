import { Navigate, Outlet } from "react-router";

import { PATH } from "@/routes/paths";
import { useAuthStore } from "@/stores/useAuthStore";

export function PublicRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to={PATH.HOME} replace />;
  }

  return <Outlet />;
}
