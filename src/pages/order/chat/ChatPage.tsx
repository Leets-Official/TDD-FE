import { useState } from "react";
import { useNavigate } from "react-router";

import { ChatInput } from "@/components/chatInput/ChatInput";
import { PageHeader } from "@/components/header/PageHeader";
import { IconButton } from "@/components/iconButton/IconButton";
import {
  ACCOUNT_HOLDER,
  ACCOUNT_TEXT,
  CURRENT_USER_ID,
  IS_HOST,
} from "@/constants/order/chat";
import { PageShell } from "@/layouts/PageShell";
import { formatChatTime } from "@/utils/order/formatChatTime";

import MenuIcon from "@/assets/icons/MenuIcon.svg?react";

import { ActionBubble } from "./components/actionBubble/ActionBubble";
import { ActionDeliveryBubble } from "./components/actionDeliveryBubble/ActionDeliveryBubble";
import { ChatBubble } from "./components/chatBubble/ChatBubble";
import { ChatMenuBar } from "./components/ChatMenuBar";
import { useChatMessages } from "./hooks/useChatMessages";

export default function ChatPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const {
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
  } = useChatMessages();

  const handleSend = (value: string) => {
    handleSendMessage(value);
    setMessageValue("");
  };

  return (
    <>
      <PageShell
        header={
          <>
            <PageHeader
              title="OO햄버거 같이 배달하실분"
              onBack={() => {
                navigate(-1);
              }}
              rightElement={
                <IconButton
                  aria-label="메뉴"
                  icon={<MenuIcon />}
                  size="large"
                  selected={isMenuOpen}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                />
              }
            />
            {isMenuOpen && (
              <ChatMenuBar
                isHost={IS_HOST}
                isDeliveryArrived={isDeliveryArrived}
                onDeliveryArrived={handleDeliveryArrivedClick}
                onSettlementRequest={handleSettlementRequestClick}
                isTransferCompleted={isTransferCompleted}
                onCopyAccount={() => handleCopyAccountClick(ACCOUNT_TEXT)}
                onTransferComplete={handleTransferCompleteClick}
              />
            )}
          </>
        }
        contentClassName="p-5"
      >
        {/* 채팅방 부분 */}
        <div className="flex flex-col gap-4">
          {chatMessages.map((item) => {
            // 현재 채팅이 나의 채팅인지 여부 (임시 하드코딩)
            // 추후 서비스 로그인 후 서버에서 받은 유저 ID와 비교하는 방식으로 변경해야함.
            const isMine = item.senderId === CURRENT_USER_ID;

            // 배달 도착 메세지의 경우
            if (item.messageType === "DELIVERY_ARRIVED") {
              return (
                <ActionDeliveryBubble
                  key={item.messageId}
                  title="배달이 도착했어요!"
                  description="방장님이 배달이 도착했음을 알립니다"
                  className={isMine ? "self-end" : "ml-14"}
                />
              );
            }
            // 정산 요청 메세지의 경우
            if (item.messageType === "SETTLEMENT_REQUEST") {
              return (
                <ActionBubble
                  key={item.messageId}
                  title={
                    IS_HOST
                      ? "정산을 요청하였습니다!"
                      : "방장님이 정산을 요청하였습니다!"
                  }
                  primaryText={ACCOUNT_TEXT}
                  secondaryText={ACCOUNT_HOLDER}
                  buttonLabel={IS_HOST ? undefined : "복사"}
                  onButtonClick={
                    IS_HOST
                      ? undefined
                      : () => handleCopyAccountClick(ACCOUNT_TEXT)
                  }
                  className={isMine ? "self-end" : "ml-14"}
                />
              );
            }
            // 송금 요청 메세지의 경우 - 방장은 정산을 완료하시겠냐는 카드/ 팀원은 송금/배달수령을 완료하셨냐는 카드로 분기
            if (item.messageType === "TRANSFER_REQUEST") {
              if (IS_HOST) {
                return (
                  <ActionDeliveryBubble
                    key={item.messageId}
                    title="정산을 완료하셨나요?"
                    description="정산을 완료하고 배달팟 후기를 남겨봐요!"
                    buttonLabel="정산 완료"
                    onButtonClick={handleSettlementCompleteClick}
                    // 자동으로 보내주는것 이므로 항상 왼쪽에 위치
                    className="ml-14"
                  />
                );
              }
              return (
                <ActionDeliveryBubble
                  key={item.messageId}
                  title="송금/배달수령을 완료하셨나요?"
                  description="송금과 배달수령을 완료하고 배달팟 후기를 남겨봐요!"
                  buttonLabel="송금/배달수령 완료"
                  buttonDisabled={isTransferCompleted}
                  onButtonClick={handleTransferCompleteClick}
                  className="ml-14"
                />
              );
            }
            // 리뷰 요청 메세지의 경우
            if (item.messageType === "REVIEW_PROMPT") {
              return (
                <ActionDeliveryBubble
                  key={item.messageId}
                  title="이번 배달팟은 어떠셨나요?"
                  description="멤버들에 대한 후기를 남겨주세요!"
                  buttonLabel="후기 남기기"
                  onButtonClick={handleReviewClick}
                  className="ml-14"
                />
              );
            }
            return (
              <ChatBubble
                key={item.messageId}
                isMine={isMine}
                nickname={isMine ? undefined : item.senderNickname}
                message={item.content ?? ""}
                time={formatChatTime(item.createdAt)}
              />
            );
          })}
        </div>
      </PageShell>
      <ChatInput
        value={messageValue}
        onChange={(event) => setMessageValue(event.target.value)}
        onSend={handleSend}
      />
    </>
  );
}
