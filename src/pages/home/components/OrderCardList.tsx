import { Card } from "@/components/card/Card";
import { cn } from "@/utils/cn";

import type { OrderItem } from "@/types/home/home";

export interface OrderCardListProps {
  orders: OrderItem[];
  onCardClick: (order: OrderItem) => void;
  hideStatusBadge?: boolean;
  className?: string;
}

export function OrderCardList({
  orders,
  onCardClick,
  hideStatusBadge,
  className,
}: OrderCardListProps) {
  return (
    <ul className={cn("flex flex-col gap-xxl", className)}>
      {orders.map((order) => (
        <li key={order.id}>
          <button
            type="button"
            className="w-full text-left"
            onClick={() => onCardClick(order)}
          >
            <Card {...order} hideStatusBadge={hideStatusBadge} />
          </button>
        </li>
      ))}
    </ul>
  );
}
