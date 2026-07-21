import { useState } from "react";

import { HomeHeader } from "@/components/header/HomeHeader";
import { TabBar } from "@/components/tabBar/TabBar";
import { PageShell } from "@/layouts/PageShell";

import { MyPodSection } from "./components/MyPodSection";
import { PodListSection } from "./components/PodListSection";
import { inProgressPods, pastPods, recruitingPods } from "./pods.mock";

const TABS = [
  { label: "배달팟 목록", value: "all" },
  { label: "내 배달팟", value: "mine" },
];

export default function HomePage() {
  const [tab, setTab] = useState(TABS[0].value);

  function handleCreateClick() {}
  function handleCardClick() {}

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
