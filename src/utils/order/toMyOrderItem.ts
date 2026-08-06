import type { StatusBadgeProps } from "@/components/badge/StatusBadge";
import type { OrderItem } from "@/types/home/home";
import type { PartyListItem } from "@/types/order/order";

import { toPartyAvatars } from "./toPartyAvatars";

const STATUS_MAP: Record<string, NonNullable<StatusBadgeProps["status"]>> = {
  RECRUITING: "recruiting",
  CLOSED: "closed",
  ORDERED: "ordered",
  DELIVERED: "arrived",
  COMPLETED: "arrived",
  SETTLED: "settled",
  CANCELED: "cancelled",
};

// 자동 취소로 넘어가는 시각 — 인원이 찼거나 모집중이 아니면 넘어갈 일이 없어 null
export function getPartyAutoCancelAt(party: PartyListItem) {
  if (party.status !== "RECRUITING") return null;
  if (party.currentParticipants >= party.minParticipants) return null;

  return new Date(party.orderExpectedAt).getTime();
}

// 마감 시각이 지났는데도 서버 status가 아직 갱신 안 됐을 수 있어 프론트에서 직접 판단
export function isPartyAutoCancelled(party: PartyListItem, now: number) {
  const autoCancelAt = getPartyAutoCancelAt(party);

  return autoCancelAt !== null && now > autoCancelAt;
}

export function toMyOrderItem(party: PartyListItem, now: number): OrderItem {
  const avatars = toPartyAvatars(party);

  return {
    id: String(party.partyId),
    category: party.category,
    title: party.title,
    status: isPartyAutoCancelled(party, now)
      ? "cancelled"
      : STATUS_MAP[party.status],
    deadline: new Date(party.orderExpectedAt).getTime(),
    avatars,
    minCount: party.minParticipants,
    maxCount: party.maxParticipants,
    location: party.dormitory,
  };
}
