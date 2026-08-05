import { useState } from "react";
import { useSearchParams } from "react-router";

import { HomeHeader } from "@/components/header/HomeHeader";
import { TabBar } from "@/components/tabBar/TabBar";
import { PageShell } from "@/layouts/PageShell";

import { MyOrderSection } from "./components/MyOrderSection";
import { OrderListSection } from "./components/OrderListSection";
import { useAllOrders } from "./hooks/useAllOrders";
import { useHomeActions } from "./hooks/useHomeActions";
import { useMyOrders } from "./hooks/useMyOrders";
import type { OrderItem } from "@/types/home/home";

const TABS = [
  { label: "배달팟 목록", value: "all" },
  { label: "내 배달팟", value: "mine" },
];
const DEFAULT_TAB = TABS[0].value;
const TAB_PARAM = "tab";

interface TabContentProps {
  onCreateClick: () => void;
  onCardClick: (order: OrderItem) => void;
}

export default function HomePage() {
  // 상세로 갔다가 뒤로 왔을 때 탭이 유지되도록 URL에 둔다
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleCreateClick, handleCardClick } = useHomeActions();

  const tabParam = searchParams.get(TAB_PARAM);
  // 주소창에 아무 값이나 넣을 수 있으므로 모르는 값은 기본 탭으로 떨어뜨린다
  const tab = TABS.some(({ value }) => value === tabParam)
    ? (tabParam as string)
    : DEFAULT_TAB;

  const handleTabChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value === DEFAULT_TAB) next.delete(TAB_PARAM);
        else next.set(TAB_PARAM, value);

        return next;
      },
      // 탭 전환이 히스토리에 쌓이면 뒤로가기가 페이지를 못 벗어난다
      { replace: true }
    );
  };

  return (
    <PageShell
      header={
        <>
          <HomeHeader />
          <TabBar tabs={TABS} value={tab} onChange={handleTabChange} />
        </>
      }
    >
      {tab === "mine" ? (
        <MyOrdersTab
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      ) : (
        <AllOrdersTab
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      )}
    </PageShell>
  );
}

function AllOrdersTab({ onCreateClick, onCardClick }: TabContentProps) {
  // dorm/menu는 서버 조회 파라미터라 목록 훅과 같은 층에 둔다
  const [dorm, setDorm] = useState("");
  const [menu, setMenu] = useState("");
  const { orders, isPending } = useAllOrders({ dorm, menu });

  return (
    <OrderListSection
      orders={orders}
      dorm={dorm}
      onDormChange={setDorm}
      menu={menu}
      onMenuChange={setMenu}
      isPending={isPending}
      onCreateClick={onCreateClick}
      onCardClick={onCardClick}
    />
  );
}

function MyOrdersTab({ onCreateClick, onCardClick }: TabContentProps) {
  const { inProgressOrders, pastOrders, isPending } = useMyOrders();

  return (
    <MyOrderSection
      inProgressOrders={inProgressOrders}
      pastOrders={pastOrders}
      isPending={isPending}
      onCreateClick={onCreateClick}
      onCardClick={onCardClick}
    />
  );
}
