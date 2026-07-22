import type { ComponentPropsWithRef } from "react";

import { Button } from "@/components/button/Button";

import { actionBubbleVariants } from "./ActionBubble.variants";

export interface ActionBubbleProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  requesterName: string;
  primaryText: string;
  secondaryText: string;
  onButtonClick?: () => void;
}

export function ActionBubble({
  requesterName,
  primaryText,
  secondaryText,
  onButtonClick,
  className,
  ...props
}: ActionBubbleProps) {
  const styles = actionBubbleVariants();

  return (
    <div className={styles.wrapper({ className })} {...props}>
      <div className={styles.content()}>
        <p className={styles.title()}>
          {requesterName}님이 정산을 요청하였습니다!
        </p>
        <div className={styles.body()}>
          <p className={styles.primaryText()}>{primaryText}</p>
          <p className={styles.secondaryText()}>{secondaryText}</p>
        </div>
      </div>
      <Button size="small" className="w-full" onClick={onButtonClick}>
        복사
      </Button>
    </div>
  );
}
