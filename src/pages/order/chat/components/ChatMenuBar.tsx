import { Button } from "@/components/button/Button";

export interface ChatMenuBarProps {
  isHost: boolean;
  isOrderCompleted?: boolean;
  onOrderComplete?: () => void;
  isDeliveryArrived?: boolean;
  onDeliveryArrived?: () => void;
  isSettlementRequested?: boolean;
  onSettlementRequest?: () => void;
  isSettlementCompleted?: boolean;
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
  onSettlementRequest,
  isSettlementCompleted = false,
  isTransferCompleted = false,
  onCopyAccount,
  onTransferComplete,
}: ChatMenuBarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-divider-2 bg-bg-1 px-5 pt-1 pb-2">
      {isHost ? (
        // 채팅방 방장인 경우
        <>
          {/* 완료 취소 API가 없어서, 다음 단계로 넘어가면 이전 단계 버튼은 되돌릴 수 없게 잠금 */}
          <Button
            variant="secondary"
            size="small"
            disabled={isDeliveryArrived || isSettlementCompleted}
            onClick={onOrderComplete}
            aria-pressed={isOrderCompleted}
            className={
              isOrderCompleted
                ? "border-[1.5px] border-divider-1 bg-white text-disabled hover:bg-white active:bg-white"
                : undefined
            }
          >
            주문 완료
          </Button>
          <Button
            variant="secondary"
            size="small"
            disabled={
              !isOrderCompleted ||
              isSettlementRequested ||
              isSettlementCompleted
            }
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
            disabled={!isDeliveryArrived || isSettlementCompleted}
            onClick={onSettlementRequest}
            aria-pressed={isSettlementRequested}
            className={
              isSettlementRequested
                ? "border-[1.5px] border-divider-1 bg-white text-disabled hover:bg-white active:bg-white"
                : undefined
            }
          >
            {isSettlementCompleted ? "정산 완료" : "정산 요청"}
          </Button>
        </>
      ) : (
        // 채팅방 방장이 아닌 경우
        <>
          <Button
            variant="outline"
            size="small"
            disabled={isTransferCompleted}
            onClick={onCopyAccount}
          >
            송금(계좌복사)
          </Button>
          <Button
            variant="outline"
            size="small"
            disabled={isTransferCompleted}
            onClick={onTransferComplete}
          >
            송금/배달수령 완료
          </Button>
        </>
      )}
    </div>
  );
}
