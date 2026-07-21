import { useState } from "react";
import { useNavigate } from "react-router";

import { HomeHeader } from "@/components/header/HomeHeader";
import { TabBar } from "@/components/tabBar/TabBar";
import { useModal } from "@/hooks/useModal";
import { PageShell } from "@/layouts/PageShell";
import { PATH } from "@/routes/paths";

import { MyPodSection } from "./components/MyPodSection";
import { PodListSection } from "./components/PodListSection";
import { inProgressPods, pastPods, recruitingPods } from "./pods.mock";

const TABS = [
  { label: "배달팟 목록", value: "all" },
  { label: "내 배달팟", value: "mine" },
];

// TODO: 로그인 사용자의 실제 기숙사 인증 여부로 교체
const IS_DORM_VERIFIED = false;

export default function HomePage() {
  const [tab, setTab] = useState(TABS[0].value);
  const navigate = useNavigate();
  const { openModal } = useModal();

  function handleCreateClick() {}

  function handleCardClick() {
    if (IS_DORM_VERIFIED) return;

    openModal({
      props: {
        title: "배달팟을 만들거나 참여하려면 \n 기숙사 인증이 필요해요",
        description: "같은 기숙사생들과 안전하게 \n 배달팟을 이용할 수 있어요",
        outlineLabel: "다음에 할게요",
        primaryLabel: "인증하러 가기",
      },
      onConfirm: () => navigate(PATH.MYPAGE_DORMITORY),
    });
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
