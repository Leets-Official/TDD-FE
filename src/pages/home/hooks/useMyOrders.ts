import { useEffect } from "react";

import { getApiErrorMessage } from "@/api/error";
import { useMyPartyList } from "@/api/order/query";
import { ORDER_ERROR_MESSAGE } from "@/constants/errorMessage/order";
import { useNowAt } from "@/hooks/useNowAt";
import { useToast } from "@/hooks/useToast";
import type { PartyListItem } from "@/types/order/order";
import {
  getPartyAutoCancelAt,
  isPartyAutoCancelled,
  toMyOrderItem,
} from "@/utils/order/toMyOrderItem";

// 진행중(ONGOING) 정책: RECRUITING·CLOSED·ORDERED·DELIVERED(정산 전) / 그 외(SETTLED 등)는 지난 배달팟
const ONGOING_STATUSES = new Set<PartyListItem["status"]>([
  "RECRUITING",
  "CLOSED",
  "ORDERED",
  "DELIVERED",
]);

export function useMyOrders() {
  const { openToast } = useToast();
  const { data: myPartyList, isPending, isError, error } = useMyPartyList();

  const now = useNowAt((myPartyList ?? []).map(getPartyAutoCancelAt));

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.MY_LIST),
    });
  }, [isError, error, openToast]);

  const isOngoingParty = (party: PartyListItem) =>
    ONGOING_STATUSES.has(party.status) && !isPartyAutoCancelled(party, now);
  const inProgressOrders = (myPartyList ?? [])
    .filter(isOngoingParty)
    .map((party) => toMyOrderItem(party, now));
  const pastOrders = (myPartyList ?? [])
    .filter((party) => !isOngoingParty(party))
    .map((party) => toMyOrderItem(party, now));

  return { inProgressOrders, pastOrders, isPending };
}
