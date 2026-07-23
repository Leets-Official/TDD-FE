import ChevronRightIcon from "@/assets/icons/ChevronRightIcon.svg?react";
import { cn } from "@/utils/cn";

interface MenuRowProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

export function MenuRow({ title, onClick, className }: MenuRowProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full cursor-pointer items-center justify-between p-4 text-black",
        className
      )}
      onClick={onClick}
    >
      <p className="text-m leading-m">{title}</p>
      <ChevronRightIcon className="size-6 text-chevron" />
    </button>
  );
}
