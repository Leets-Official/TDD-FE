import type { OrderItem } from "@/pages/home/orderItem";
import type { PartyListItem } from "@/types/order/order";

import { toPartyAvatars } from "./toPartyAvatars";

export function toOrderItem(party: PartyListItem): OrderItem {
  const avatars = toPartyAvatars(party);

  return {
    id: String(party.partyId),
    category: party.category,
    title: party.title,
    deadline: new Date(party.orderExpectedAt).getTime(),
    avatars,
    minCount: party.minParticipants,
    maxCount: party.maxParticipants,
    location: party.dormitory,
  };
}
