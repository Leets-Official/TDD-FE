import { authInstance } from "@/api/instance";
import type { PartyListItem } from "@/types/order/order";

export const getPartyList = async () => {
  const { data } = await authInstance.get<PartyListItem[]>("/delivery-parties");

  return data;
};
