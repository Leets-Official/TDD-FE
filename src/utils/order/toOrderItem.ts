import type { AvatarGroupItem } from "@/components/avatar/AvatarGroup";
import type { OrderItem } from "@/pages/home/orderItem.mock";
import type { PartyListItem } from "@/types/order/order";

export function toOrderItem(party: PartyListItem): OrderItem {
  const avatars: AvatarGroupItem[] = Array.from(
    { length: party.currentParticipants },
    (_, index) => ({
      id: `${party.partyId}-participant-${index}`,
      alt: "참여자",
    })
  );

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
