import { useState } from "react";

import qrImage from "@/assets/QR.png";
import AlertCircleIcon from "@/assets/icons/AlertCircleIcon.svg?react";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon.svg?react";
import { Button } from "@/components/button/Button";
import { INQUIRY_CHAT_URL } from "@/constants/links";
import { cn } from "@/utils/cn";
import { formatYmd } from "@/utils/date";

export interface RestrictionCardProps {
  noShowApprovedCount: number;
  suspendedUntil: string;
}
export function RestrictionCard({
  noShowApprovedCount,
  suspendedUntil,
}: RestrictionCardProps) {
  const [isQrOpen, setIsQrOpen] = useState(false);

  return (
    <div className="flex w-full max-w-[310px] flex-col gap-4 rounded-lg bg-error-subtle px-4 py-6">
      <h3 className="flex items-center gap-1 text-label text-error">
        <AlertCircleIcon className="size-6" />
        이용 제한 중
      </h3>

      <ul className="flex flex-col gap-2 text-body-2 text-text-1">
        <li>• 사유: 노쇼 누적 {noShowApprovedCount}회</li>
        <li>• 제한 항목: 배달 팟 개설 및 참여 제한</li>
        <li>• 기간: {formatYmd(suspendedUntil)}까지</li>
      </ul>

      <Button
        variant="outline"
        size="small"
        className="w-full"
        onClick={() =>
          window.open(INQUIRY_CHAT_URL, "_blank", "noopener,noreferrer")
        }
      >
        문의하기(채팅방 링크)
      </Button>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setIsQrOpen((prev) => !prev)}
          className="flex cursor-pointer items-center gap-1 text-body-2 text-text-3"
          aria-expanded={isQrOpen}
        >
          QR코드
          <ChevronDownIcon
            className={cn(
              "size-5 transition-transform",
              isQrOpen && "rotate-180"
            )}
          />
        </button>
        {isQrOpen && (
          <img
            className="size-[183px]"
            src={qrImage}
            alt="문의 채팅방 QR 코드"
          />
        )}
      </div>
    </div>
  );
}
