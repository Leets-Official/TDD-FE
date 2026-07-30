import { AuthIntroShell } from "@/layouts/AuthIntroShell";
import cardImg from "@/assets/OnboardingDeliveryCard.png";
import chatBubbleImg from "@/assets/OnboardingChatBubble.svg";
import profileChatBubbleImg from "@/assets/OnboardingProfileBubble1.png";
import profileChatBubble2Img from "@/assets/OnboardingProfileBubble2.png";
import { Button } from "@/components/button/Button";
import { useOnboardingStart } from "@/pages/onboarding/hooks/useOnboardingStart";

export default function OnboardingPage() {
  const { handleStartClick } = useOnboardingStart();

  return (
    <AuthIntroShell
      action={
        <Button className="w-full" onClick={handleStartClick}>
          시작하기
        </Button>
      }
    >
      <p className="mt-4 text-center text-body-1 text-text-3">
        우리 기숙사 안에서 해결해요
      </p>
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
    </AuthIntroShell>
  );
}
