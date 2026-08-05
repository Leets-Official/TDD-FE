import { useState } from "react";
import { generatePath, useNavigate } from "react-router";

import { getApiErrorMessage } from "@/api/error";
import {
  useCancelParty,
  useCloseParty,
  useJoinParty,
  useLeaveParty,
} from "@/api/order/query";
import { ORDER_ERROR_MESSAGE } from "@/constants/errorMessage/order";
import { NOSHOW_RESTRICTION_MODAL_PROPS } from "@/constants/guardModal";
import { ORDER_TOAST_MESSAGE } from "@/constants/toastMessage";
import { useDormVerificationGuard } from "@/hooks/useDormVerificationGuard";
import { useMe } from "@/hooks/useMe";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PATH } from "@/routes/paths";

export type ParticipationStatus = "none" | "applied" | "matched";

interface UseOrderActionsParams {
  partyId: number;
  orderId?: string;
}

export function useOrderActions({ partyId, orderId }: UseOrderActionsParams) {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { openToast } = useToast();
  const { isNoshowRestricted } = useMe();
  const { ensureDormVerified } = useDormVerificationGuard();

  const { mutate: joinParty } = useJoinParty();
  const { mutate: leaveParty } = useLeaveParty();
  const { mutate: cancelParty } = useCancelParty();
  const { mutate: closeParty } = useCloseParty();

  // 참여자 목록이 오기 전까지만 쓰는 낙관적 값 — 이후로는 서버 응답이 우선
  const [status, setStatus] = useState<ParticipationStatus>("none");
  const [isCancelled, setIsCancelled] = useState(false);

  function handleApplyClick() {
    if (!ensureDormVerified()) return;

    if (isNoshowRestricted) {
      openModal({ props: NOSHOW_RESTRICTION_MODAL_PROPS });
      return;
    }

    joinParty(partyId, {
      onSuccess: (result) => {
        setStatus(
          result.currentParticipants >= result.maxParticipants
            ? "matched"
            : "applied"
        );
        openToast({ message: ORDER_TOAST_MESSAGE.JOIN_SUCCESS });
      },
      onError: (error) => {
        openToast({
          message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.JOIN),
        });
      },
    });
  }

  function handleCancelRecruitClick() {
    openModal({
      props: {
        title: "정말로 모집을 \n 취소하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        cancelParty(partyId, {
          onSuccess: () => {
            setIsCancelled(true);
          },
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.CANCEL),
            });
          },
        });
      },
    });
  }

  function handleCloseRecruitClick() {
    openModal({
      props: {
        title: "정말로 모집을 \n 마감하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        closeParty(partyId, {
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.CLOSE),
            });
          },
        });
      },
    });
  }

  function handleCancelClick() {
    openModal({
      props: {
        title: "정말로 배달팟 참여를 \n 취소하시겠습니까?",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        leaveParty(partyId, {
          onSuccess: () => {
            setStatus("none");
          },
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.LEAVE),
            });
          },
        });
      },
    });
  }

  function handleEnterChat() {
    if (!orderId) return;
    navigate(generatePath(PATH.ORDER_CHAT, { orderId }));
  }

  return {
    status,
    isCancelled,
    handleApplyClick,
    handleCancelRecruitClick,
    handleCloseRecruitClick,
    handleCancelClick,
    handleEnterChat,
  };
}
