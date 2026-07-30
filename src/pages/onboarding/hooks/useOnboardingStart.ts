import { useNavigate } from "react-router";

import { useModal } from "@/hooks/useModal";
import { usePwaInstallPrompt } from "@/hooks/usePwaInstallPrompt";
import { PATH } from "@/routes/paths";
import { getPwaPlatform, isPwaInstalled } from "@/utils/pwa";

const MANUAL_GUIDE_DESCRIPTION = {
  ios: "공유 버튼을 누르고 '홈 화면에 추가'를 선택해주세요",
  other: "브라우저 메뉴에서 '앱 설치' 또는 '홈 화면에 추가'를 선택해주세요",
} as const;

// 시작하기 진입 분기 — 이미 설치했으면 바로 로그인, 아니면 네이티브 설치 프롬프트나 수동 안내 모달을 거친 뒤 로그인으로 보냅니다.
export function useOnboardingStart() {
  const navigate = useNavigate();
  const { canInstall, promptToInstall } = usePwaInstallPrompt();
  const { openModal } = useModal();

  const goToLogin = () => navigate(PATH.LOGIN);

  const openManualGuideModal = (platform: "ios" | "other") => {
    openModal({
      props: {
        hasLogo: true,
        title: "홈 화면에 추가하고 더 편하게 써보세요",
        description: MANUAL_GUIDE_DESCRIPTION[platform],
        outlineLabel: "닫기",
      },
      onCancel: goToLogin,
    });
  };

  const openInstallPromptModal = () => {
    openModal({
      props: {
        hasLogo: true,
        title: "앱처럼 설치하고 더 편하게 써보세요",
        description: "알림도 놓치지 않고 바로 받아볼 수 있어요",
        outlineLabel: "다음에 할게요",
        primaryLabel: "설치하기",
      },
      onConfirm: async () => {
        try {
          await promptToInstall();
        } catch {
          // 설치 실패해도 진행은 막지 않음
        }
        goToLogin();
      },
      onCancel: goToLogin,
    });
  };

  const handleStartClick = () => {
    if (isPwaInstalled()) {
      goToLogin();
      return;
    }

    if (getPwaPlatform() === "ios") {
      openManualGuideModal("ios");
      return;
    }

    if (!canInstall) {
      openManualGuideModal("other");
      return;
    }

    openInstallPromptModal();
  };

  return { handleStartClick };
}
