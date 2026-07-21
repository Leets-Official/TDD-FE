import { PageShell } from "@/layouts/PageShell";
import Logo from "@/assets/Logo.svg?react";
import cardImg from "@/assets/OnboardingDeliveryCard.png";
import chatBubbleImg from "@/assets/OnboardingChatBubble.svg";
import profileChatBubbleImg from "@/assets/OnboardingProfileBubble1.png";
import profileChatBubble2Img from "@/assets/OnboardingProfileBubble2.png";
import { Button } from "@/components/button/Button";
import { useNavigate } from "react-router";
import { getPwaPlatform, isPwaInstalled } from "@/utils/pwa";
import { usePwaInstallPrompt } from "@/hooks/usePwaInstallPrompt";
import { useModal } from "@/hooks/useModal";

const MANUAL_GUIDE_DESCRIPTION = {
  ios: "공유 버튼을 누르고 '홈 화면에 추가'를 선택해주세요",
  other: "브라우저 메뉴에서 '앱 설치' 또는 '홈 화면에 추가'를 선택해주세요",
} as const;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { canInstall, promptToInstall } = usePwaInstallPrompt();
  const { openModal } = useModal();

  const goToLogin = () => navigate("/login");

  const openManualGuideModal = (platform: "ios" | "other") => {
    openModal({
      props: {
        title: "홈 화면에 추가하고 더 편하게 써보세요",
        description: MANUAL_GUIDE_DESCRIPTION[platform],
        outlineLabel: "닫기",
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

    openModal({
      props: {
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

  return (
    <PageShell>
      <div className="flex h-full w-full flex-col items-center justify-center px-5">
        <div className="flex flex-col items-center justify-center gap-4">
          <Logo className="h-10 w-[75px]" />
          <p className="text-center text-body-1 text-text-3">
            우리 기숙사 안에서 해결해요
          </p>
        </div>
        <div className="relative mt-10 h-[210px] w-full max-w-[360px]">
          <img
            src={profileChatBubbleImg}
            alt="주문할게요!"
            className="absolute top-0 right-[17px] h-12 w-auto motion-safe:animate-pop-in"
            style={{ animationDelay: "0.3s" }}
          />
          <img
            src={chatBubbleImg}
            alt="넵 좋아요!"
            className="absolute top-[59px] right-0 z-10 h-10 w-auto motion-safe:animate-pop-in"
            style={{ animationDelay: "0.9s" }}
          />
          <img
            src={profileChatBubble2Img}
            alt="로비에서 봐요!"
            className="absolute top-[120px] right-1 z-20 h-12 w-auto motion-safe:animate-pop-in"
            style={{ animationDelay: "1.5s" }}
          />
          <img
            src={cardImg}
            alt="OO햄버거 같이 배달하실분"
            className="absolute top-[38px] -left-[17px] z-5 w-[309px]"
          />
        </div>
        <Button
          size="medium"
          className="mt-25 w-full"
          onClick={handleStartClick}
        >
          시작하기
        </Button>
      </div>
    </PageShell>
  );
}
