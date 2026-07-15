import type { ComponentPropsWithRef } from "react";

import { useCountdown } from "@/hooks/useCountdown";

import { timeBadgeVariants } from "./TimeBadge.variants";

export interface TimeBadgeProps extends Omit<
  ComponentPropsWithRef<"span">,
  "children"
> {
  deadline: number;
  urgentThresholdMs?: number;
}

export function TimeBadge({
  deadline,
  urgentThresholdMs,
  className,
  ...props
}: TimeBadgeProps) {
  const { timeLabel, isUrgent, isExpired } = useCountdown(deadline, {
    urgentThresholdMs,
  });

  return (
    <span
      className={timeBadgeVariants({
        variant: !isExpired && isUrgent ? "urgent" : "default",
        className,
      })}
      {...props}
    >
      {isExpired ? (
        <span className="text-label">마감</span>
      ) : (
        <>
          <span className="text-label">{timeLabel}</span>
          <span className="text-caption-1">남음</span>
        </>
      )}
    </span>
  );
}
