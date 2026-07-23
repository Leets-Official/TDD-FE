import type { ComponentPropsWithRef } from "react";

import { Button } from "@/components/button/Button";

import { actionBubbleVariants } from "./ActionBubble.variants";

export interface ActionBubbleProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  title: string;
  primaryText: string;
  secondaryText: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function ActionBubble({
  title,
  primaryText,
  secondaryText,
  buttonLabel,
  onButtonClick,
  className,
  ...props
}: ActionBubbleProps) {
  const styles = actionBubbleVariants();

  return (
    <div className={styles.wrapper({ className })} {...props}>
      <div className={styles.content()}>
        <p className={styles.title()}>{title}</p>
        <div className={styles.body()}>
          <p className={styles.primaryText()}>{primaryText}</p>
          <p className={styles.secondaryText()}>{secondaryText}</p>
        </div>
      </div>
      {buttonLabel && (
        <Button size="small" className="w-full" onClick={onButtonClick}>
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
