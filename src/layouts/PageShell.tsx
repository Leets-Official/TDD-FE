import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface PageShellProps {
  header?: ReactNode;
  bottom?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function PageShell({
  header,
  bottom,
  children,
  className,
  contentClassName,
}: PageShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-white pt-[env(safe-area-inset-top)]",
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
        <div className="shrink-0 px-5 pt-3 pb-[calc(16px+env(safe-area-inset-bottom))]">
          {bottom}
        </div>
      )}
    </div>
  );
}
