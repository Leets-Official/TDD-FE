import type { ComponentPropsWithRef } from "react";

import { type VariantProps } from "@/utils/cn";

import { statusBadgeVariants } from "./StatusBadge.variants";

export interface StatusBadgeProps
  extends
    ComponentPropsWithRef<"span">,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({
  status,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={statusBadgeVariants({ status, className })} {...props}>
      {children}
    </span>
  );
}
