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

// 이 파일의 확인 모달 셋은 title만 다르다 — 질문은 onConfirm 옆에 남기고 반복되는 라벨만 걷어낸다
const confirmModalProps = (title: string) => ({
  title,
  outlineLabel: "아니요",
  primaryLabel: "네",
});

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

  const { mutate: joinParty, isPending: isJoining } = useJoinParty();
  const { mutate: leaveParty, isPending: isLeaving } = useLeaveParty();
  const { mutate: cancelParty, isPending: isCancelling } = useCancelParty();
  const { mutate: closeParty, isPending: isClosing } = useCloseParty();

  // 하나라도 처리 중이면 이 배달팟의 CTA를 전부 막는다 — 특히 참여 신청은 모달 없이 바로 호출돼 연타로 중복 전송된다
  const isActionPending = isJoining || isLeaving || isCancelling || isClosing;

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
      props: confirmModalProps("정말로 모집을 \n 취소하시겠습니까?"),
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
      props: confirmModalProps("정말로 모집을 \n 마감하시겠습니까?"),
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
      props: confirmModalProps("정말로 배달팟 참여를 \n 취소하시겠습니까?"),
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
    isActionPending,
    handleApplyClick,
    handleCancelRecruitClick,
    handleCloseRecruitClick,
    handleCancelClick,
    handleEnterChat,
  };
}
