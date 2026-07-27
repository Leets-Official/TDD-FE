import type { ReactNode } from "react";

import Logo from "@/assets/Logo.svg?react";
import LogoLettering from "@/assets/LogoLettering.svg?react";

interface AuthIntroShellProps {
  children: ReactNode;
  action: ReactNode;
}

export function AuthIntroShell({ children, action }: AuthIntroShellProps) {
  return (
    <div className="flex min-h-0 w-full flex-1 [scrollbar-width:none] flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="flex min-h-full flex-col items-center justify-center px-5 pt-[env(safe-area-inset-top)] pb-[calc(16px+env(safe-area-inset-bottom))]">
        <div className="flex flex-col items-center gap-2">
          <Logo className="h-12 w-28" />
          <LogoLettering className="w-63" />
        </div>
        <div className="flex min-h-[390px] w-full flex-col items-center">
          {children}
        </div>
        {action}
      </div>
    </div>
  );
}
