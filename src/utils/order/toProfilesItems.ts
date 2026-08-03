import type { ProfilesItem } from "@/components/profiles/Profiles";
import type { Participant } from "@/types/order/order";

export function toProfilesItems(participants: Participant[]): ProfilesItem[] {
  return participants.map((participant) => ({
    id: String(participant.userId),
    nickname: participant.nickname,
    temperature: participant.mannerTemperature,
    src: participant.profileImage ?? undefined,
  }));
}
