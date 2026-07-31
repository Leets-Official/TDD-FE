import { useEffect, useState } from "react";

import { Card } from "@/components/card/Card";
import { Dropdown } from "@/components/dropdown/Dropdown";

import {
  DORM_OPTIONS,
  MENU_OPTIONS,
  ORDER_TIME_OPTIONS,
} from "@/constants/home/filterOptions";
import { filterOrders } from "@/utils/home/filterOrders";

import { CreateOrderFab } from "./CreateOrderFab";
import { OrderEmptyState } from "./OrderEmptyState";
import type { OrderItem } from "../orderItem.mock";

export interface OrderListSectionProps {
  orders: OrderItem[];
  dorm: string;
  onDormChange: (value: string) => void;
  menu: string;
  onMenuChange: (value: string) => void;
  onCreateClick: () => void;
  onCardClick: (order: OrderItem) => void;
}

export function OrderListSection({
  orders,
  dorm,
  onDormChange,
  menu,
  onMenuChange,
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
      <div className="flex items-center gap-3.25 px-xxl py-s">
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

      {filteredOrders.length === 0 ? (
        <OrderEmptyState onCreateClick={onCreateClick} />
      ) : (
        <>
          <ul className="flex flex-col gap-xxl px-xl pb-24">
            {filteredOrders.map((order) => (
              <li key={order.id}>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => onCardClick(order)}
                >
                  <Card {...order} hideStatusBadge />
                </button>
              </li>
            ))}
          </ul>
          <CreateOrderFab onClick={onCreateClick} />
        </>
      )}
    </div>
  );
}
