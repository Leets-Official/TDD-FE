import { useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";

import { uploadChatImage } from "@/api/order/chat/api";
import { useChatMessageHistory } from "@/api/order/chat/query";
import { getApiErrorMessage } from "@/api/error";
import {
  useCompleteParty,
  useOrderParty,
  usePartyDetail,
  usePartyParticipants,
  useSettleParty,
} from "@/api/order/query";
import { useRequestSettlement } from "@/api/order/settlement/query";
import { useMyPage } from "@/api/user/query";
import { ORDER_ERROR_MESSAGE } from "@/constants/errorMessage/order";
import { ORDER_TOAST_MESSAGE } from "@/constants/toastMessage";
import { isUploadImageContentType } from "@/constants/imageUpload";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PATH } from "@/routes/paths";
import type { ChatMessage } from "@/types/order/chat";

import { useChatSocket } from "./useChatSocket";

export function useChatMessages() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const partyId = Number(orderId);
  const { openModal } = useModal();
  const { openToast } = useToast();
  const { mutate: orderParty } = useOrderParty();
  const { mutate: completeParty } = useCompleteParty();
  const { mutate: requestSettlement } = useRequestSettlement();
  const { mutate: settleParty } = useSettleParty();
  const { data: messageHistory } = useChatMessageHistory(partyId);
  const { data: myPage } = useMyPage();
  const { data: partyDetail } = usePartyDetail(partyId);
  const { data: partyParticipants } = usePartyParticipants(partyId);
  const myUserId = myPage?.userId;
  const hostUserId = partyDetail?.creatorId;
  const isHost = myUserId !== undefined && myUserId === hostUserId;
  // 채팅 메시지 응답에는 프로필 이미지가 없어 참가자 목록에서 senderId로 매칭
  const avatarByUserId = new Map(
    (partyParticipants?.participants ?? []).map((participant) => [
      participant.userId,
      participant.profileImage,
    ])
  );
  const getAvatarSrc = (userId: number) =>
    avatarByUserId.get(userId) ?? undefined;
  const isOrderCompleted =
    partyDetail?.status === "ORDERED" ||
    partyDetail?.status === "DELIVERED" ||
    partyDetail?.status === "COMPLETED" ||
    partyDetail?.status === "SETTLED";
  const isDeliveryArrived =
    partyDetail?.status === "DELIVERED" ||
    partyDetail?.status === "COMPLETED" ||
    partyDetail?.status === "SETTLED";
  const [isTransferCompleted, setIsTransferCompleted] = useState(false);
  // 소켓으로 실시간 수신한 메시지만 누적 — 히스토리(messageHistory)와는 렌더 시 병합
  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);
  // 다른 채팅방으로 전환되면(orderId 변경) 이전 방에서 쌓인 실시간 메시지를 비운다.
  const [trackedOrderId, setTrackedOrderId] = useState(orderId);
  if (orderId !== trackedOrderId) {
    setTrackedOrderId(orderId);
    setRealtimeMessages([]);
  }
  // 히스토리 조회 결과와 실시간 수신 메시지를 병합 — 소켓이 히스토리보다 먼저 받은 메시지가 덮어쓰지 않도록 병합
  const chatMessages = [
    ...new Map(
      [...(messageHistory ?? []), ...realtimeMessages].map((item) => [
        item.messageId,
        item,
      ])
    ).values(),
  ].sort((a, b) => a.messageId - b.messageId);
  const isSettlementRequested = chatMessages.some(
    (message) => message.messageType === "SETTLEMENT_REQUEST"
  );
  const isSettlementCompleted = chatMessages.some(
    (message) => message.messageType === "REVIEW_REQUEST"
  );

  // 소켓으로 들어온 메시지를 실시간 누적 목록에 반영 (동일 messageId가 이미 있으면 무시)
  const { sendMessage } = useChatSocket({
    partyId,
    onMessage: (message) => {
      setRealtimeMessages((prev) =>
        prev.some((item) => item.messageId === message.messageId)
          ? prev
          : [...prev, message]
      );
    },
  });

  // 방장 헤더에서 주문 완료 버튼 클릭 시 모달이 나타나고, 확인 시 API 호출
  const handleOrderCompleteClick = () => {
    if (!Number.isFinite(partyId)) return;

    openModal({
      props: {
        title: "주문을 완료하셨나요?",
        description:
          '"네"를 누르시면\n배달팟 멤버들에게 주문 완료 알림이 보내지며,\n되돌릴 수 없어요.',
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        // 서버가 성공 시 ORDER_COMPLETED 메시지를 자동 발행 → 소켓 구독으로 반영됨
        orderParty(partyId, {
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(error, ORDER_ERROR_MESSAGE.COMPLETE),
            });
          },
        });
      },
    });
  };

  // 방장 헤더에서 배달 도착 버튼 클릭 시 모달이 나타나고, 확인 시 배달 도착 메세지 push
  const handleDeliveryArrivedClick = () => {
    if (!Number.isFinite(partyId)) return;

    openModal({
      props: {
        title: "배달이 도착하셨나요?",
        description:
          '"네"를 누르시면\n배달팟 멤버들에게 도착알림이 보내지며,\n정산을 요청할 수 있습니다.',
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        // 서버가 성공 시 DELIVERY_ARRIVED 메시지를 자동 발행 → 소켓 구독으로 반영됨
        completeParty(partyId, {
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(
                error,
                ORDER_ERROR_MESSAGE.DELIVERY_COMPLETE
              ),
            });
          },
        });
      },
    });
  };

  // 방장 헤더에서 정산 요청 버튼 클릭 시 모달 띄우고, 확인 시 정산 요청 API 호출
  // TODO: 실제 주문 금액 입력 UI가 없어 총액/인당 금액을 임시 고정값(2만원/5천원)으로 보냄 — 추후 실제 입력으로 교체 필요
  const handleSettlementRequestClick = () => {
    if (!Number.isFinite(partyId) || hostUserId === undefined) return;
    if (!partyParticipants) return;

    openModal({
      props: {
        title: "정산을 요청하시겠습니까?",
        description:
          "등록한 계좌번호를 전송하여\n배달팟 멤버들에게 정산을 요청합니다.",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        const payments = partyParticipants.participants
          .filter((participant) => participant.userId !== hostUserId)
          .map((participant) => ({ userId: participant.userId, amount: 5000 }));

        requestSettlement(
          { partyId, body: { totalAmount: 20000, payments } },
          {
            onError: (error) => {
              openToast({
                message: getApiErrorMessage(
                  error,
                  ORDER_ERROR_MESSAGE.SETTLEMENT_REQUEST
                ),
              });
            },
          }
        );
      },
    });
  };

  // 방장이 정산 완료 버튼(정산 요청 메세지 뒤에 로컬로 붙는 카드) 클릭 시 모달 띄우고, 확인 시 MVP 정산 완료 API 호출
  const handleSettlementCompleteClick = () => {
    if (!Number.isFinite(partyId)) return;

    openModal({
      props: {
        title: "정산을 모두 마치셨나요?",
        description: '"네"를 누르시면 정산완료로 처리되며,\n되돌릴 수 없어요.',
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        // 서버가 성공 시 REVIEW_REQUEST 메시지를 자동 발행 → 소켓 구독으로 반영됨
        settleParty(partyId, {
          onError: (error) => {
            openToast({
              message: getApiErrorMessage(
                error,
                ORDER_ERROR_MESSAGE.SETTLEMENT_COMPLETE
              ),
            });
          },
        });
      },
    });
  };

  // 팀원이 송금/배달수령 완료 버튼 클릭 시 모달 띄우고, 버튼 비활성화 처리
  const handleTransferCompleteClick = () => {
    openModal({
      props: {
        title: "송금 및 배달수령을 모두 마치셨나요?",
        description: '"네"를 누르시면 배달완료로 처리되며,\n되돌릴 수 없어요.',
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        setIsTransferCompleted(true);
      },
    });
  };

  // 계좌번호 복사 버튼 클릭 시 토스트 - 복사 성공 여부에 따라 문구 분기
  const handleCopyAccountClick = (accountText: string) => {
    if (!accountText) {
      openToast({ message: ORDER_TOAST_MESSAGE.ACCOUNT_LOAD_FAILED });
      return;
    }

    navigator.clipboard
      .writeText(accountText)
      .then(() => {
        openToast({ message: ORDER_TOAST_MESSAGE.ACCOUNT_COPY_SUCCESS });
      })
      .catch(() => {
        openToast({ message: ORDER_TOAST_MESSAGE.ACCOUNT_COPY_FAILED });
      });
  };

  // 리뷰 남기기 버튼 클릭 시 리뷰 작성 페이지로 이동
  const handleReviewClick = () => {
    if (!orderId) return;
    navigate(generatePath(PATH.ORDER_REVIEW, { orderId }));
  };

  // 낙관적 UI 없이, 소켓 브로드캐스트로 되돌아온 메시지를 그대로 반영한다
  const handleSendMessage = (value: string) => {
    if (!value.trim()) return;

    const sent = sendMessage({
      messageType: "USER",
      content: value,
      imageUrl: null,
    });

    if (!sent) {
      openToast({ message: ORDER_TOAST_MESSAGE.MESSAGE_SEND_FAILED });
    }
  };

  // 사진첩에서 선택한 이미지를 순서대로 업로드하고, 성공할 때마다 IMAGE 메시지를 전송한다
  const handleSendImages = async (files: File[]) => {
    if (!Number.isFinite(partyId)) return;

    for (const file of files) {
      if (!isUploadImageContentType(file.type)) {
        openToast({ message: "지원하지 않는 이미지 형식이에요" });
        continue;
      }

      try {
        const key = await uploadChatImage(partyId, file, file.type);
        const sent = sendMessage({
          messageType: "IMAGE",
          content: null,
          imageUrl: key,
        });

        if (!sent) {
          openToast({ message: "이미지를 보내지 못했어요" });
          break;
        }
      } catch {
        openToast({ message: "이미지 업로드에 실패했어요" });
      }
    }
  };

  return {
    chatMessages,
    myUserId,
    isHost,
    partyTitle: partyDetail?.title,
    getAvatarSrc,
    isOrderCompleted,
    isDeliveryArrived,
    isSettlementRequested,
    isSettlementCompleted,
    isTransferCompleted,
    handleOrderCompleteClick,
    handleDeliveryArrivedClick,
    handleSettlementRequestClick,
    handleSettlementCompleteClick,
    handleTransferCompleteClick,
    handleCopyAccountClick,
    handleReviewClick,
    handleSendMessage,
    handleSendImages,
  };
}
