import { useQuery } from "@tanstack/react-query";

import { getPartyList } from "@/api/order/api";
import type { PartyListParams } from "@/types/order/order";

// 배달팟 목록 조회 API
export const usePartyList = (params?: PartyListParams) =>
  useQuery({
    queryKey: ["parties", params],
    queryFn: () => getPartyList(params),
  });
