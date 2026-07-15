import type { ComponentPropsWithRef, ReactNode } from "react";

import { cn } from "@/utils/cn";

import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.svg?react";

import { IconButton } from "@/components/iconButton/IconButton";

export interface PageHeaderProps extends ComponentPropsWithRef<"header"> {
  title: string;
  onBack?: () => void;
  rightElement?: ReactNode;
  onRightClick?: () => void;
  rightElementAriaLabel?: string;
}

export function PageHeader({
  title,
  onBack,
  rightElement,
  onRightClick,
  rightElementAriaLabel,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex h-14 w-full items-center bg-white px-2",
        className
      )}
      {...props}
    >
      {onBack && (
        <IconButton
          aria-label="뒤로 가기"
          icon={<ChevronLeftIcon />}
          size="large"
          onClick={onBack}
        />
      )}
      <h1 className="absolute left-1/2 -translate-x-1/2 text-label text-black">
        {title}
      </h1>
      {rightElement && (
        <IconButton
          aria-label={rightElementAriaLabel || "추가 액션"}
          icon={rightElement}
          size="large"
          className="ml-auto"
          onClick={onRightClick}
        />
      )}
    </header>
  );
}
