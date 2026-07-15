import type { ComponentPropsWithRef } from "react";

import { timeBadgeVariants } from "./TimeBadge.variants";

export interface TimeBadgeProps extends Omit<
  ComponentPropsWithRef<"span">,
  "children"
> {
  timeLabel: string;
  isUrgent: boolean;
  isExpired: boolean;
}

export function TimeBadge({
  timeLabel,
  isUrgent,
  isExpired,
  className,
  ...props
}: TimeBadgeProps) {
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
