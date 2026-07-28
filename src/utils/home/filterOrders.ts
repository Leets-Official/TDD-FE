import type { OrderItem } from "@/pages/home/orderItem.mock";

export interface OrderFilters {
  dorm: string;
  menu: string;
  orderTimeMinutes: string;
}

export function filterOrders(
  orders: OrderItem[],
  filters: OrderFilters
): OrderItem[] {
  return orders.filter((order) => {
    if (filters.dorm && order.location !== filters.dorm) return false;
    if (filters.menu && order.category !== filters.menu) return false;

    if (filters.orderTimeMinutes) {
      const remainingMinutes = (order.deadline - Date.now()) / (60 * 1000);
      if (remainingMinutes > Number(filters.orderTimeMinutes)) return false;
    }

    return true;
  });
}
