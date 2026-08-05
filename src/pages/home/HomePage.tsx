import { useState } from "react";

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

interface TabContentProps {
  onCreateClick: () => void;
  onCardClick: (order: OrderItem) => void;
}

interface AllOrdersTabProps extends TabContentProps {
  dorm: string;
  onDormChange: (value: string) => void;
  menu: string;
  onMenuChange: (value: string) => void;
}

export default function HomePage() {
  const [tab, setTab] = useState(TABS[0].value);
  const [dorm, setDorm] = useState("");
  const [menu, setMenu] = useState("");
  const { handleCreateClick, handleCardClick } = useHomeActions();

  return (
    <PageShell
      header={
        <>
          <HomeHeader />
          <TabBar tabs={TABS} value={tab} onChange={setTab} />
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
          dorm={dorm}
          onDormChange={setDorm}
          menu={menu}
          onMenuChange={setMenu}
          onCreateClick={handleCreateClick}
          onCardClick={handleCardClick}
        />
      )}
    </PageShell>
  );
}

function AllOrdersTab({
  dorm,
  onDormChange,
  menu,
  onMenuChange,
  onCreateClick,
  onCardClick,
}: AllOrdersTabProps) {
  const { orders, isPending } = useAllOrders({ dorm, menu });

  return (
    <OrderListSection
      orders={orders}
      dorm={dorm}
      onDormChange={onDormChange}
      menu={menu}
      onMenuChange={onMenuChange}
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
