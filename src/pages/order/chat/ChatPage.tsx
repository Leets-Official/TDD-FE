import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

import { ChatInput } from "@/components/chatInput/ChatInput";
import { PageHeader } from "@/components/header/PageHeader";
import { IconButton } from "@/components/iconButton/IconButton";
import { PageShell } from "@/layouts/PageShell";
import { formatChatTime } from "@/utils/order/formatChatTime";
import { parseSettlementRequestContent } from "@/utils/order/parseSettlementRequestContent";

import MenuIcon from "@/assets/icons/MenuIcon.svg?react";

import { ActionAccountBubble } from "./components/actionAccountBubble/ActionAccountBubble";
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
    myUserId,
    isHost,
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
  } = useChatMessages();

  const handleSend = (value: string) => {
    handleSendMessage(value);
    setMessageValue("");
  };

  // 가장 최근 정산 요청 메시지를 찾아 실제 계좌 정보를 가져온다
  const settlementRequestMessage = [...chatMessages]
    .reverse()
    .find((item) => item.messageType === "SETTLEMENT_REQUEST");
  const { accountText: settlementAccountText } = parseSettlementRequestContent(
    settlementRequestMessage?.content ?? null
  );

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
                isHost={isHost}
                isOrderCompleted={isOrderCompleted}
                onOrderComplete={handleOrderCompleteClick}
                isDeliveryArrived={isDeliveryArrived}
                onDeliveryArrived={handleDeliveryArrivedClick}
                isSettlementRequested={isSettlementRequested}
                isSettlementCompleted={isSettlementCompleted}
                onSettlementRequest={handleSettlementRequestClick}
                onSettlementComplete={handleSettlementCompleteClick}
                isTransferCompleted={isTransferCompleted}
                onCopyAccount={() =>
                  handleCopyAccountClick(settlementAccountText)
                }
                onTransferComplete={handleTransferCompleteClick}
              />
            )}
          </>
        }
        contentClassName="p-5"
      >
        {/* 채팅방 부분 */}
        <div className="flex flex-col gap-4">
          {chatMessages.map((item, index) => {
            // 현재 채팅이 나의 채팅인지 여부
            const isMine = item.senderId === myUserId;

            // 바로 이전 채팅과 같은 사람이 연달아 보낸 메시지면 프로필(아바타+닉네임) 생략
            const previousItem = chatMessages[index - 1];
            const isConsecutiveSameSender =
              previousItem?.messageType === "USER" &&
              previousItem.senderId === item.senderId;
            const showNickname = !isMine && !isConsecutiveSameSender;

            // 주문 완료 메세지의 경우 - 서버가 발행하는 시스템 메시지라 senderId가 null이므로,
            // 방장만 트리거 가능한 메시지 특성상 senderId 매칭 대신 현재 보는 사람이 방장인지로 위치 결정
            if (item.messageType === "ORDER_COMPLETED") {
              return (
                <ActionDeliveryBubble
                  key={item.messageId}
                  title="주문완료!"
                  description="방장님이 주문을 완료했음을 알립니다"
                  className={isHost ? "self-end" : "ml-14"}
                />
              );
            }
            // 배달 도착 메세지의 경우 - 위와 동일한 이유
            if (item.messageType === "DELIVERY_ARRIVED") {
              return (
                <ActionDeliveryBubble
                  key={item.messageId}
                  title="배달이 도착했어요!"
                  description="방장님이 배달이 도착했음을 알립니다"
                  className={isHost ? "self-end" : "ml-14"}
                />
              );
            }
            // 정산 요청 메세지의 경우 - 위와 동일한 이유
            // 실제 채팅 메시지는 아니지만, 이 메시지 바로 다음에 방장/팀원별 다음 액션 카드를 로컬로 이어붙임
            // (방장: 정산 완료 → 팀원: 송금/배달수령 완료 — 둘 다 개인 액션 안내라 항상 왼쪽에 위치)
            if (item.messageType === "SETTLEMENT_REQUEST") {
              const { amountText, accountText } = parseSettlementRequestContent(
                item.content
              );

              return (
                <Fragment key={item.messageId}>
                  <ActionAccountBubble
                    title={
                      isHost
                        ? "정산을 요청하였습니다!"
                        : "방장님이 정산을 요청하였습니다!"
                    }
                    primaryText={amountText}
                    secondaryText={accountText}
                    buttonLabel={isHost ? undefined : "복사"}
                    buttonDisabled={isTransferCompleted}
                    onButtonClick={
                      isHost
                        ? undefined
                        : () => handleCopyAccountClick(accountText)
                    }
                    className={isHost ? "self-end" : "ml-14"}
                  />
                  {isHost ? (
                    <ActionDeliveryBubble
                      title="정산을 완료하셨나요?"
                      description="정산을 완료하고 배달팟 후기를 남겨봐요!"
                      buttonLabel="정산 완료"
                      onButtonClick={handleSettlementCompleteClick}
                      className="ml-14"
                    />
                  ) : (
                    <ActionDeliveryBubble
                      title="송금/배달수령을 완료하셨나요?"
                      description="송금과 배달수령을 완료하고 배달팟 후기를 남겨봐요!"
                      buttonLabel="송금/배달수령 완료"
                      buttonDisabled={isTransferCompleted}
                      onButtonClick={handleTransferCompleteClick}
                      className="ml-14"
                    />
                  )}
                </Fragment>
              );
            }
            // 리뷰 요청 메세지의 경우 - 서버가 발행하는 시스템 메시지라 senderId가 null이므로,
            // 위의 ORDER_COMPLETED 등과 동일한 이유로 isHost 기준 위치 결정
            if (item.messageType === "REVIEW_REQUEST") {
              return (
                <ActionDeliveryBubble
                  key={item.messageId}
                  title="이번 배달팟은 어떠셨나요?"
                  description="멤버들에 대한 후기를 남겨주세요!"
                  buttonLabel="후기 남기기"
                  onButtonClick={handleReviewClick}
                  className={isHost ? "self-end" : "ml-14"}
                />
              );
            }
            return (
              <ChatBubble
                key={item.messageId}
                isMine={isMine}
                nickname={showNickname ? item.senderNickname : undefined}
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
