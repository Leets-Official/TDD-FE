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
    isFetching: isParticipantsFetching,
    isSuccess: isParticipantsSuccess,
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
    // CTA는 성공한 참가자 스냅샷이 생긴 뒤에만 서버 상태에서 파생한다.
    hasParticipantsLoaded: isParticipantsSuccess,
    isPending,
    isError,
    isParticipantsPending,
    isParticipantsFetching,
    isParticipantsError,
  };
}
