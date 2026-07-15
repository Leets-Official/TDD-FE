import type { ComponentPropsWithRef } from "react";

import { cn } from "@/utils/cn";

import Logo from "@/assets/Logo.svg?react";
import BoardIcon from "@/assets/icons/BoardIcon.svg?react";
import MypageIcon from "@/assets/icons/MypageIcon.svg?react";

import { IconButton } from "@/components/iconButton/IconButton";

export type HomeHeaderProps = ComponentPropsWithRef<"header">;

export function HomeHeader({ className, ...props }: HomeHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-14 w-full items-center justify-between bg-white px-2",
        className
      )}
      {...props}
    >
      <Logo aria-label="로고" className="ml-4 shrink-0" />
      <div className="flex">
        <IconButton aria-label="게시판" icon={<BoardIcon />} size="large" />
        <IconButton
          aria-label="마이페이지"
          icon={<MypageIcon />}
          size="large"
        />
      </div>
    </header>
  );
}
