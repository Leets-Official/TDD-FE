import {
  AvatarGroup,
  type AvatarGroupItem,
} from "@/components/avatar/AvatarGroup";
import {
  StatusBadge,
  type StatusBadgeProps,
} from "@/components/badge/StatusBadge";
import { FlagBadge } from "@/components/badge/FlagBadge";
import { TimeBadge } from "@/components/badge/TimeBadge";
import { useCountdown } from "@/hooks/useCountdown";

import BuildingIcon from "@/assets/icons/BuildingIcon.svg?react";

import { CATEGORY_ICONS, type FoodCategory } from "./categoryIcons";
import { cardVariants } from "./Card.variants";

const STATUS_LABELS: Record<NonNullable<StatusBadgeProps["status"]>, string> = {
  recruiting: "모집중",
  matched: "매칭완료",
  arrived: "배달도착",
  cancelled: "취소",
};

export interface CardProps {
  category: FoodCategory;
  title: string;
  status?: StatusBadgeProps["status"];
  deadline: number;
  urgentThresholdMs?: number;
  avatars: AvatarGroupItem[];
  minCount: number;
  maxCount: number;
  location: string;
}

export function Card({
  category,
  title,
  status,
  deadline,
  urgentThresholdMs,
  avatars,
  minCount,
  maxCount,
  location,
}: CardProps) {
  const isResolvedStatus =
    status === "matched" || status === "arrived" || status === "cancelled";
  const {
    timeLabel,
    isUrgent: isTimeUrgent,
    isExpired: isTimeExpired,
  } = useCountdown(deadline, { urgentThresholdMs });
  const isClosed = isResolvedStatus || isTimeExpired;
  const effectiveStatus: StatusBadgeProps["status"] =
    !isResolvedStatus && isTimeExpired ? "cancelled" : status;
  const remainingSlots = maxCount - avatars.length;
  const isCountUrgent = remainingSlots === 1;

  return (
    <div className={cardVariants({ hasStatus: !!effectiveStatus })}>
      {effectiveStatus && (
        <StatusBadge status={effectiveStatus} className="self-start">
          {STATUS_LABELS[effectiveStatus]}
        </StatusBadge>
      )}

      <div className="flex gap-[22px]">
        <div className="flex size-[61px] shrink-0 items-center justify-center overflow-hidden rounded-md">
          <span
            role="img"
            aria-label={category}
            className="text-[46px] leading-none"
          >
            {CATEGORY_ICONS[category]}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-xl">
          <p className="text-title-2 text-text-1">{title}</p>

          <div className="flex flex-col gap-xxs">
            {!isClosed && (
              <div className="flex items-center gap-2">
                <TimeBadge
                  timeLabel={timeLabel}
                  isUrgent={isTimeUrgent}
                  isExpired={isTimeExpired}
                />
                {isTimeUrgent && <FlagBadge>곧 끝나요!</FlagBadge>}
              </div>
            )}

            <div className="flex items-center">
              <AvatarGroup avatars={avatars} total={maxCount} />
              <span className="ml-2 text-label text-text-1">
                {avatars.length}/{maxCount}명
              </span>
              {!isClosed && isCountUrgent ? (
                <FlagBadge className="ml-2">
                  {remainingSlots}자리 남았어요!
                </FlagBadge>
              ) : (
                <span className="ml-2 text-body-2 text-text-4">
                  ({minCount}~{maxCount}인)
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <BuildingIcon className="size-5 text-text-4" aria-hidden="true" />
              <span className="text-body-2 text-text-3">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
