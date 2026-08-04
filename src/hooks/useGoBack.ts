import { useLocation, useNavigate } from "react-router";

import { PATH } from "@/routes/paths";

// 딥링크·새로고침으로 바로 들어오면 뒤로가기가 앱 밖으로 나갈 수 있어 앱 내부 경로로 보냅니다
export function useGoBack(fallbackPath: string = PATH.HOME) {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (location.key === "default") {
      navigate(fallbackPath, { replace: true });
      return;
    }

    navigate(-1);
  };
}
