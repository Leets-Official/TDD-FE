import { cn } from "@/utils/cn";
import type { ComponentPropsWithRef, ReactNode } from "react";

export interface ChipProps extends ComponentPropsWithRef<"button"> {
  icon?: ReactNode;
  /** 선택된 상태를 눌린 색으로 유지 */
  selected?: boolean;
}

export function Chip({
  className,
  icon,
  children,
  selected,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      data-selected={selected}
      className={cn(
        "inline-flex cursor-pointer items-center gap-xxs rounded-lg border border-divider-1 bg-white px-padding-m py-padding-s text-body-2 text-text-1 transition-colors hover:bg-secondary-hover active:bg-secondary-pressed data-[selected=true]:bg-secondary-pressed",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
