import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestSettlement } from "@/api/order/settlement/api";
import type { CreateSettlementRequest } from "@/types/order/settlement";

// 정산 요청 생성 API
export const useRequestSettlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      partyId,
      body,
    }: {
      partyId: number;
      body: CreateSettlementRequest;
    }) => requestSettlement(partyId, body),
    onSuccess: (_, { partyId }) => {
      queryClient.invalidateQueries({ queryKey: ["parties"] });
      queryClient.invalidateQueries({ queryKey: ["parties", partyId] });
    },
  });
};
