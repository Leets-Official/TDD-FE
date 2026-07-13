import { cn } from "@/utils/cn";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface ChipProps extends ComponentPropsWithRef<"div"> {
  icon?: ReactNode;
}

export function Chip({ className, icon, children, ...props }: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-xxs rounded-lg border border-divider-1 bg-white px-padding-m py-padding-s text-body-2 text-text-1",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </div>
  );
}
