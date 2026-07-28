import { useQuery } from "@tanstack/react-query";

import { getPartyList } from "@/api/order/api";

export const usePartyList = () =>
  useQuery({ queryKey: ["parties"], queryFn: getPartyList });
