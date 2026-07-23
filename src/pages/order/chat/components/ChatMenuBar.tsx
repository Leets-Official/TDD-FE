import { Button } from "@/components/button/Button";

export interface ChatMenuBarProps {
  isHost: boolean;
  isDeliveryArrived?: boolean;
  onDeliveryArrived?: () => void;
  onSettlementRequest?: () => void;
  isTransferCompleted?: boolean;
  onCopyAccount?: () => void;
  onTransferComplete?: () => void;
}

export function ChatMenuBar({
  isHost,
  isDeliveryArrived = false,
  onDeliveryArrived,
  onSettlementRequest,
  isTransferCompleted = false,
  onCopyAccount,
  onTransferComplete,
}: ChatMenuBarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-divider-2 bg-bg-1 px-5 pt-1 pb-2">
      {isHost ? (
        // 채팅방 방장인 경우
        <>
          <Button
            variant="secondary"
            size="small"
            onClick={onDeliveryArrived}
            aria-pressed={isDeliveryArrived}
            className={
              isDeliveryArrived
                ? // 여기 비활성화 스타일에서 선택이 되어야 함으로 따로 정의 -> 클릭 시 배달 도착 취소가 되어야함.
                  "border-[1.5px] border-divider-1 bg-white text-disabled hover:bg-white active:bg-white"
                : undefined
            }
          >
            {isDeliveryArrived ? "도착 완료" : "배달 도착"}
          </Button>
          <Button
            variant="secondary"
            size="small"
            disabled={!isDeliveryArrived}
            onClick={onSettlementRequest}
          >
            정산 요청
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
