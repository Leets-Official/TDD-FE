import { FOOD_CATEGORY_MAP } from "@/constants/order/foodCategory";
import type { OrderDetail } from "@/pages/order/detail/orderDetail";
import type { PartyDetail } from "@/types/order/order";

export function toOrderDetail(party: PartyDetail): OrderDetail {
  return {
    id: String(party.id),
    category: FOOD_CATEGORY_MAP[party.foodCategoryId],
    title: party.title,
    description: party.description,
    location: party.dormitory ?? "",
    deadline: new Date(party.orderExpectedAt).getTime(),
    minCount: party.minParticipants,
    maxCount: party.maxParticipants,
    host: {
      id: String(party.creatorId),
      nickname: party.leaderNickname,
      temperature: Number(party.leaderMannerTemperature),
      src: party.leaderProfileImage ?? undefined,
    },
    participants: [],
    status: party.status,
    isCancelled: party.status === "CANCELED",
  };
}
