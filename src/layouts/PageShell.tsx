import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface PageShellProps {
  header?: ReactNode;
  bottom?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  bottomClassName?: string;
}

export function PageShell({
  header,
  bottom,
  children,
  className,
  contentClassName,
  bottomClassName,
}: PageShellProps) {
  return (
    <div
      className={cn(
        // 키보드가 뜬 동안에는 홈 인디케이터가 키보드에 가려지므로 하단 safe-area를 걷어냅니다
        "flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-white pt-[env(safe-area-inset-top)] pb-[max(0px,calc(env(safe-area-inset-bottom)-var(--keyboard-inset,0px)))]",
        className
      )}
    >
      {header && <div className="shrink-0">{header}</div>}

      <main
        className={cn(
          "min-h-0 flex-1 [scrollbar-width:none] overflow-y-auto overscroll-none [&::-webkit-scrollbar]:hidden",
          contentClassName
        )}
      >
        {children}
      </main>

      {bottom && (
        <div className={cn("shrink-0 px-5 pt-3 pb-4", bottomClassName)}>
          {bottom}
        </div>
      )}
    </div>
  );
}
