import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";

import SirenIcon from "@/assets/icons/SirenIcon.svg?react";

interface ReportButtonProps {
  reported: boolean;
  onClick: () => void;
}

export function ReportButton({ reported, onClick }: ReportButtonProps) {
  return (
    <Button
      variant="outline"
      size="small"
      onClick={onClick}
      className={cn(
        "text-error hover:bg-error-subtle active:bg-error-subtle",
        reported && "border-transparent bg-error-subtle"
      )}
    >
      <SirenIcon />
      신고하기
    </Button>
  );
}
