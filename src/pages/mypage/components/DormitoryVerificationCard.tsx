import ChevronRightIcon from "@/assets/icons/ChevronRightIcon.svg?react";
import type { DormVerificationStatus } from "@/types/dormVerification";

import { STATUS_META } from "./DormitoryVerificationCard.constants";
import { dormitoryVerificationCardVariants } from "./DormitoryVerificationCard.variants";

export interface DormitoryVerificationCardProps {
  status: DormVerificationStatus;
  verifiedUntil?: string | null;
  rejectReason?: string | null;
  onClick?: () => void;
}

export function DormitoryVerificationCard({
  status,
  verifiedUntil,
  rejectReason,
  onClick,
}: DormitoryVerificationCardProps) {
  const { tone, Icon, label, description: desc } = STATUS_META[status];

  const {
    root,
    title,
    statusRow,
    icon,
    status: statusText,
    description,
    chevron,
  } = dormitoryVerificationCardVariants({ status: tone });

  const descriptionText =
    typeof desc === "function" ? desc({ verifiedUntil, rejectReason }) : desc;

  return (
    <div className={root({ class: "text-left" })}>
      <h2 className={title()}>기숙사 인증 관리</h2>
      <div className={statusRow()}>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <Icon className={icon()} />
            <span className={statusText()}>{label}</span>
          </div>
          <p className={description()}>{descriptionText}</p>
        </div>
        <button type="button">
          <ChevronRightIcon className={chevron()} onClick={onClick} />
        </button>
      </div>
    </div>
  );
}
