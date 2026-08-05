import { Button } from "@/components/button/Button";

export interface ChatMenuBarProps {
  isHost: boolean;
  isOrderCompleted?: boolean;
  onOrderComplete?: () => void;
  isDeliveryArrived?: boolean;
  onDeliveryArrived?: () => void;
  isSettlementRequested?: boolean;
  isSettlementCompleted?: boolean;
  onSettlementRequest?: () => void;
  onSettlementComplete?: () => void;
  isTransferCompleted?: boolean;
  onCopyAccount?: () => void;
  onTransferComplete?: () => void;
}

export function ChatMenuBar({
  isHost,
  isOrderCompleted = false,
  onOrderComplete,
  isDeliveryArrived = false,
  onDeliveryArrived,
  isSettlementRequested = false,
  isSettlementCompleted = false,
  onSettlementRequest,
  onSettlementComplete,
  isTransferCompleted = false,
  onCopyAccount,
  onTransferComplete,
}: ChatMenuBarProps) {
  // 정산 요청 전엔 "정산 요청", 요청 후엔 같은 자리에서 "정산 완료"로 바뀜
  const settlementLabel = isSettlementCompleted
    ? "정산 완료됨"
    : isSettlementRequested
      ? "정산 완료"
      : "정산 요청";
  const settlementDisabled = !isDeliveryArrived || isSettlementCompleted;
  const settlementOnClick = isSettlementRequested
    ? onSettlementComplete
    : onSettlementRequest;
  return (
    <div className="flex items-center gap-2 border-b border-divider-2 bg-bg-1 px-5 pt-1 pb-2">
      {isHost ? (
        // 채팅방 방장인 경우
        <>
          <Button
            variant="secondary"
            size="small"
            disabled={isOrderCompleted}
            onClick={onOrderComplete}
            aria-pressed={isOrderCompleted}
            className={
              isOrderCompleted
                ? "border-[1.5px] border-divider-1 bg-white text-disabled hover:bg-white active:bg-white"
                : undefined
            }
          >
            {isOrderCompleted ? "주문 완료됨" : "주문 완료"}
          </Button>
          <Button
            variant="secondary"
            size="small"
            disabled={!isOrderCompleted || isDeliveryArrived}
            onClick={onDeliveryArrived}
            aria-pressed={isDeliveryArrived}
            className={
              isDeliveryArrived
                ? "border-[1.5px] border-divider-1 bg-white text-disabled hover:bg-white active:bg-white"
                : undefined
            }
          >
            {isDeliveryArrived ? "도착 완료" : "배달 도착"}
          </Button>
          <Button
            variant="secondary"
            size="small"
            disabled={settlementDisabled}
            onClick={settlementOnClick}
            aria-pressed={isSettlementCompleted}
            className={
              isSettlementCompleted
                ? "border-[1.5px] border-divider-1 bg-white text-disabled hover:bg-white active:bg-white"
                : undefined
            }
          >
            {settlementLabel}
          </Button>
        </>
      ) : (
        // 채팅방 방장이 아닌 경우
        <>
          <Button
            variant="outline"
            size="small"
            disabled={!isSettlementRequested || isTransferCompleted}
            onClick={onCopyAccount}
          >
            송금(계좌복사)
          </Button>
          <Button
            variant="outline"
            size="small"
            disabled={!isSettlementRequested || isTransferCompleted}
            onClick={onTransferComplete}
          >
            송금/배달수령 완료
          </Button>
        </>
      )}
    </div>
  );
}
