import { useEffect } from "react";

import { getApiErrorMessage } from "@/api/error";
import { usePartyDetail, usePartyParticipants } from "@/api/order/query";
import { ORDER_ERROR_MESSAGE } from "@/constants/errorMessage/order";
import { useToast } from "@/hooks/useToast";
import { toOrderDetail } from "@/utils/order/toOrderDetail";
import { toProfilesItems } from "@/utils/order/toProfilesItems";

export function useOrderDetail(partyId: number) {
  const { openToast } = useToast();
  const {
    data: partyDetail,
    isPending,
    isError,
    error,
  } = usePartyDetail(partyId);
  const {
    data: partyParticipants,
    isPending: isParticipantsPending,
    isError: isParticipantsError,
    error: participantsError,
  } = usePartyParticipants(partyId);

  useEffect(() => {
    if (!isError) return;
    openToast({
      message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.DETAIL),
    });
  }, [isError, error, openToast]);

  useEffect(() => {
    if (!isParticipantsError) return;
    openToast({
      message: getApiErrorMessage(
        participantsError,
        ORDER_ERROR_MESSAGE.PARTICIPANTS
      ),
    });
  }, [isParticipantsError, participantsError, openToast]);

  return {
    order: partyDetail ? toOrderDetail(partyDetail) : undefined,
    participants: partyParticipants
      ? toProfilesItems(partyParticipants.participants)
      : [],
    // 한 번이라도 로드됐는지 — 낙관적 로컬 상태 대신 서버 값을 쓸 시점 판단에 필요
    hasParticipantsLoaded: partyParticipants !== undefined,
    isPending,
    isError,
    isParticipantsPending,
    isParticipantsError,
  };
}
