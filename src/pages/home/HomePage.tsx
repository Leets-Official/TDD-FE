import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { HomeHeader } from "@/components/header/HomeHeader";
import { TabBar } from "@/components/tabBar/TabBar";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import { MyPodSection } from "./components/MyPodSection";
import { PodListSection } from "./components/PodListSection";
import {
  inProgressPods,
  pastPods,
  recruitingPods,
  type PodItem,
} from "./pods.mock";

const TABS = [
  { label: "배달팟 목록", value: "all" },
  { label: "내 배달팟", value: "mine" },
];

// TODO: 로그인 사용자의 실제 기숙사 인증 여부로 교체
const IS_DORM_VERIFIED = true;

export default function HomePage() {
  const [tab, setTab] = useState(TABS[0].value);
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { openToast } = useToast();

  useEffect(() => {
    const matchedPod = inProgressPods.find((pod) => pod.status === "matched");
    if (!matchedPod) return;

    openToast({
      message: "배달팟이 매칭되었습니다!",
      actionLabel: "채팅방 입장",
      onActionClick: () => {
        // TODO: 채팅방 페이지 구현 후 실제 이동으로 교체
      },
    });
  }, [openToast]);

  function handleCreateClick() {}

  function handleCardClick(pod: PodItem) {
    if (!IS_DORM_VERIFIED) {
      openModal({
        props: {
          title: "배달팟을 만들거나 참여하려면 \n 기숙사 인증이 필요해요",
          description:
            "같은 기숙사생들과 안전하게 \n 배달팟을 이용할 수 있어요",
          outlineLabel: "다음에 할게요",
          primaryLabel: "인증하러 가기",
        },
        onConfirm: () => navigate(PATH.MYPAGE_DORMITORY),
      });
      return;
    }

    navigate(PATH.ORDER_DETAIL.replace(":orderId", pod.id));
  }

  return (
    <PageShell header={<HomeHeader />}>
      <TabBar tabs={TABS} value={tab} onChange={setTab} />

      {tab === "mine" ? (
        <MyPodSection
          inProgressPods={inProgressPods}
          pastPods={pastPods}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      ) : (
        <PodListSection
          pods={recruitingPods}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      )}
    </PageShell>
  );
}
