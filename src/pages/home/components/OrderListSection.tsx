import { useEffect, useState } from "react";

import { Dropdown } from "@/components/dropdown/Dropdown";

import {
  DORM_OPTIONS,
  MENU_OPTIONS,
  ORDER_TIME_OPTIONS,
} from "@/constants/home/filterOptions";
import { filterOrders } from "@/utils/home/filterOrders";

import { CreateOrderFab } from "./CreateOrderFab";
import { OrderCardList } from "./OrderCardList";
import { OrderEmptyState } from "./OrderEmptyState";
import { OrderListSkeleton } from "./OrderListSkeleton";
import type { OrderItem } from "@/types/home/home";

export interface OrderListSectionProps {
  orders: OrderItem[];
  dorm: string;
  onDormChange: (value: string) => void;
  menu: string;
  onMenuChange: (value: string) => void;
  isPending: boolean;
  onCreateClick: () => void;
  onCardClick: (order: OrderItem) => void;
}

export function OrderListSection({
  orders,
  dorm,
  onDormChange,
  menu,
  onMenuChange,
  isPending,
  onCreateClick,
  onCardClick,
}: OrderListSectionProps) {
  const [orderTimeMinutes, setOrderTimeMinutes] = useState("");
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const activeOrders = orders.filter((order) => order.deadline > now);
  // dorm/menu는 usePartyList 호출 시 categoryId/dormitoryId로 이미 서버에서 필터링됨
  const filteredOrders = filterOrders(activeOrders, {
    dorm: "",
    menu: "",
    orderTimeMinutes,
  });

  return (
    <div className="relative flex flex-col">
      <div className="sticky top-0 z-10 flex items-center gap-3.25 bg-white px-xxl py-s">
        <Dropdown
          variant="filter"
          label="기숙사"
          options={DORM_OPTIONS}
          value={dorm}
          onChange={onDormChange}
        />
        <Dropdown
          variant="filter"
          label="메뉴"
          options={MENU_OPTIONS}
          visibleOptions={5}
          value={menu}
          onChange={onMenuChange}
        />
        <Dropdown
          variant="filter"
          label="주문 예정 시간"
          options={ORDER_TIME_OPTIONS}
          value={orderTimeMinutes}
          onChange={setOrderTimeMinutes}
        />
      </div>

      {isPending ? (
        <OrderListSkeleton />
      ) : filteredOrders.length === 0 ? (
        <OrderEmptyState onCreateClick={onCreateClick} />
      ) : (
        <>
          <OrderCardList
            orders={filteredOrders}
            onCardClick={onCardClick}
            hideStatusBadge
            className="px-xl pb-24"
          />
          <CreateOrderFab onClick={onCreateClick} />
        </>
      )}
    </div>
  );
}
