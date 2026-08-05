import { useEffect } from "react";

import { getApiErrorMessage } from "@/api/error";
import { usePartyList } from "@/api/order/query";
import type { FoodCategory } from "@/components/card/categoryIcons";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { FOOD_CATEGORY_ID_MAP } from "@/constants/order/foodCategory";
import { useToast } from "@/hooks/useToast";
import { toOrderItem } from "@/utils/order/toOrderItem";

interface UseAllOrdersParams {
  dorm: string;
  menu: string;
}

export function useAllOrders({ dorm, menu }: UseAllOrdersParams) {
  const { openToast } = useToast();
  const {
    data: partyList,
    isPending,
    isError,
    error,
  } = usePartyList({
    categoryId: menu ? FOOD_CATEGORY_ID_MAP[menu as FoodCategory] : undefined,
    dormitory: dorm || undefined,
  });

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, API_ERROR_MESSAGE.ORDER_LIST),
    });
  }, [isError, error, openToast]);

  const orders = (partyList ?? [])
    .filter((party) => party.status === "RECRUITING")
    .map(toOrderItem);

  return { orders, isPending };
}
