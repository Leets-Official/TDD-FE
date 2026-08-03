import { useState } from "react";

import { Card } from "@/components/card/Card";
import { Dropdown } from "@/components/dropdown/Dropdown";

import {
  DORM_OPTIONS,
  MENU_OPTIONS,
  ORDER_STATE_OPTIONS,
  ORDER_TIME_OPTIONS,
} from "@/constants/home/filterOptions";
import { filterOrders } from "@/utils/home/filterOrders";

import { CreateOrderFab } from "./CreateOrderFab";
import { OrderEmptyState } from "./OrderEmptyState";
import type { OrderItem } from "../orderItem";

export interface MyOrderSectionProps {
  inProgressOrders: OrderItem[];
  pastOrders: OrderItem[];
  onCreateClick: () => void;
  onCardClick: (order: OrderItem) => void;
}

export function MyOrderSection({
  inProgressOrders,
  pastOrders,
  onCreateClick,
  onCardClick,
}: MyOrderSectionProps) {
  const [orderState, setOrderState] = useState("all");
  const [dorm, setDorm] = useState("");
  const [menu, setMenu] = useState("");
  const [orderTimeMinutes, setOrderTimeMinutes] = useState("");

  const filters = { dorm, menu, orderTimeMinutes };
  const filteredInProgressOrders =
    orderState === "past" ? [] : filterOrders(inProgressOrders, filters);
  const filteredPastOrders =
    orderState === "ongoing" ? [] : filterOrders(pastOrders, filters);

  return (
    <div className="relative flex flex-col">
      <div className="flex scrollbar-none items-center gap-3.25 overflow-x-auto px-xxl py-s [&::-webkit-scrollbar]:hidden">
        <Dropdown
          variant="filter"
          label="진행중/지난"
          options={ORDER_STATE_OPTIONS}
          value={orderState}
          onChange={setOrderState}
        />
        <Dropdown
          variant="filter"
          label="기숙사"
          options={DORM_OPTIONS}
          value={dorm}
          onChange={setDorm}
        />
        <Dropdown
          variant="filter"
          label="메뉴"
          options={MENU_OPTIONS}
          visibleOptions={5}
          value={menu}
          onChange={setMenu}
        />
        <Dropdown
          variant="filter"
          label="주문 예정 시간"
          options={ORDER_TIME_OPTIONS}
          value={orderTimeMinutes}
          onChange={setOrderTimeMinutes}
        />
      </div>

      {filteredInProgressOrders.length === 0 &&
      filteredPastOrders.length === 0 ? (
        <OrderEmptyState onCreateClick={onCreateClick} />
      ) : (
        <>
          <div className="flex flex-col gap-9 px-xl pb-24">
            {orderState !== "past" && filteredInProgressOrders.length > 0 && (
              <section className="flex flex-col gap-l">
                <h2 className="text-title-1 text-text-1">진행중인 배달팟</h2>
                <ul className="flex flex-col gap-xxl">
                  {filteredInProgressOrders.map((order) => (
                    <li key={order.id}>
                      <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => onCardClick(order)}
                      >
                        <Card {...order} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {orderState !== "ongoing" && filteredPastOrders.length > 0 && (
              <section className="flex flex-col gap-l">
                <h2 className="text-title-1 text-text-1">지난 배달팟</h2>
                <ul className="flex flex-col gap-xxl">
                  {filteredPastOrders.map((order) => (
                    <li key={order.id}>
                      <button
                        type="button"
                        className="w-full text-left"
                        onClick={() => onCardClick(order)}
                      >
                        <Card {...order} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <CreateOrderFab onClick={onCreateClick} />
        </>
      )}
    </div>
  );
}
