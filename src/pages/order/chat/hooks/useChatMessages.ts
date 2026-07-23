import { useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";

import { CURRENT_USER_ID, HOST_USER_ID } from "@/constants/order/chat";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { PATH } from "@/routes/paths";
import type { ChatMessage } from "@/types/order/chat";

import { DUMMY_CHAT } from "../chat.mock";

export function useChatMessages() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { openModal } = useModal();
  const { openToast } = useToast();
  const [isDeliveryArrived, setIsDeliveryArrived] = useState(false);
  const [isTransferCompleted, setIsTransferCompleted] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(DUMMY_CHAT);

  const pushMessage = (
    message: Omit<ChatMessage, "messageId" | "createdAt">
  ) => {
    setChatMessages((prev) => [
      ...prev,
      {
        ...message,
        messageId: prev.length + 1,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // 방장 헤더에서 배달 도착 버튼 클릭 시 모달이 나타나고, 확인 시 배달 도착 메세지 push
  const handleDeliveryArrivedClick = () => {
    // 배달 취소 모달은 현재 백엔드 타입이 없어서 주석처리
    // if (isDeliveryArrived) {
    //   openModal({
    //     props: {
    //       title: "배달 도착 완료를 취소할까요?",
    //       outlineLabel: "아니요",
    //       primaryLabel: "네",
    //     },
    //     onConfirm: () => {
    //       setIsDeliveryArrived(false);
    //     },
    //   });
    //   return;
    // }

    openModal({
      props: {
        title: "배달이 도착하셨나요?",
        description:
          '"네"를 누르시면\n배달팟 멤버들에게 도착알림이 보내지며,\n정산을 요청할 수 있습니다.',
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        setIsDeliveryArrived(true);
        pushMessage({
          messageType: "DELIVERY_ARRIVED",
          senderId: HOST_USER_ID,
          senderNickname: "방장",
          content: null,
          imageUrl: null,
        });
      },
    });
  };

  // 방장 헤더에서 정산 요청 버튼 클릭 시 모달 띄우고, 확인 시 정산 요청 메세지와 송금 요청 메세지 push
  // 프론트에서 두 개를 push 하는 방향으로.
  const handleSettlementRequestClick = () => {
    openModal({
      props: {
        title: "정산을 요청하시겠습니까?",
        description:
          "등록한 계좌번호를 전송하여\n배달팟 멤버들에게 정산을 요청합니다.",
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        pushMessage({
          messageType: "SETTLEMENT_REQUEST",
          senderId: HOST_USER_ID,
          senderNickname: "방장",
          content: null,
          imageUrl: null,
        });
        pushMessage({
          messageType: "TRANSFER_REQUEST",
          senderId: HOST_USER_ID,
          senderNickname: "방장",
          content: null,
          imageUrl: null,
        });
      },
    });
  };

  // 방장이 정산 완료 버튼 클릭 시 모달 띄우고 리뷰 요청 메세지 push
  const handleSettlementCompleteClick = () => {
    openModal({
      props: {
        title: "정산을 모두 마치셨나요?",
        description: '"네"를 누르시면 정산완료로 처리되며,\n되돌릴 수 없어요.',
        outlineLabel: "아니요",
        primaryLabel: "네",
      },
      onConfirm: () => {
        pushMessage({
          messageType: "REVIEW_PROMPT",
          senderId: HOST_USER_ID,
          senderNickname: "방장",
          content: null,
          imageUrl: null,
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

  // 계좌번호 복사 버튼 클릭 시 토스트
  const handleCopyAccountClick = (accountText: string) => {
    navigator.clipboard.writeText(accountText);
    openToast({ message: "계좌번호가 복사되었습니다" });
  };

  // 리뷰 남기기 버튼 클릭 시 리뷰 작성 페이지로 이동
  const handleReviewClick = () => {
    if (!orderId) return;
    navigate(generatePath(PATH.ORDER_REVIEW, { orderId }));
  };

  const handleSendMessage = (value: string) => {
    pushMessage({
      messageType: "USER",
      senderId: CURRENT_USER_ID,
      senderNickname: "나",
      content: value,
      imageUrl: null,
    });
  };

  return {
    chatMessages,
    isDeliveryArrived,
    isTransferCompleted,
    handleDeliveryArrivedClick,
    handleSettlementRequestClick,
    handleSettlementCompleteClick,
    handleTransferCompleteClick,
    handleCopyAccountClick,
    handleReviewClick,
    handleSendMessage,
  };
}
