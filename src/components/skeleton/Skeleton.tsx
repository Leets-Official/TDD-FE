import type { ComponentPropsWithRef } from "react";

import { cn } from "@/utils/cn";

export type SkeletonProps = ComponentPropsWithRef<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded bg-bg-4", className)}
      {...props}
    />
  );
}
