import type { ComponentPropsWithRef } from "react";

import { cn } from "@/utils/cn";

import Logo from "@/assets/Logo.svg?react";
import BoardIcon from "@/assets/icons/BoardIcon.svg?react";
import MypageIcon from "@/assets/icons/ProfileIcon.svg?react";

import { IconButton } from "@/components/iconButton/IconButton";
import { useNavigate } from "react-router";
import { PATH } from "@/routes/paths";

export type HomeHeaderProps = ComponentPropsWithRef<"header">;

export function HomeHeader({ className, ...props }: HomeHeaderProps) {
  const navigate = useNavigate();
  return (
    <header
      className={cn(
        "flex h-14 w-full items-center justify-between bg-white px-2",
        className
      )}
      {...props}
    >
      <Logo aria-label="로고" className="ml-4 shrink-0" />
      <div className="flex gap-2">
        <IconButton
          aria-label="게시판"
          icon={
            <div className="flex flex-col items-center">
              <BoardIcon />
              <span className="text-caption-2 text-black">게시판</span>
            </div>
          }
          size="large"
          onClick={() => navigate(PATH.BOARD)}
        />
        <IconButton
          aria-label="마이페이지"
          icon={
            <div className="flex flex-col items-center">
              <MypageIcon />
              <span className="text-caption-2 text-black">마이페이지</span>
            </div>
          }
          size="large"
          onClick={() => navigate(PATH.MYPAGE)}
        />
      </div>
    </header>
  );
}
