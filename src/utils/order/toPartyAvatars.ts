import type { AvatarGroupItem } from "@/components/avatar/AvatarGroup";
import type { PartyListItem } from "@/types/order/order";

export function toPartyAvatars(party: PartyListItem): AvatarGroupItem[] {
  return Array.from({ length: party.currentParticipants }, (_, index) => ({
    id: `${party.partyId}-participant-${index}`,
    alt: "참여자",
  }));
}
