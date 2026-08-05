import { useEffect, useState } from "react";

import { getApiErrorMessage } from "@/api/error";
import { useMyPartyList } from "@/api/order/query";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import type { PartyListItem } from "@/types/order/order";
import {
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

  // 마감 시각 경과 여부를 실시간으로 반영하기 위한 tick
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, API_ERROR_MESSAGE.MY_ORDER_LIST),
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
