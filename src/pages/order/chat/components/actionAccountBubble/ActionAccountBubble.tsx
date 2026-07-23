import type { ComponentPropsWithRef } from "react";

import { Button } from "@/components/button/Button";

import { actionAccountBubbleVariants } from "./ActionAccountBubble.variants";

export interface ActionAccountBubbleProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  title: string;
  primaryText: string;
  secondaryText: string;
  buttonLabel?: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
}

export function ActionAccountBubble({
  title,
  primaryText,
  secondaryText,
  buttonLabel,
  buttonDisabled,
  onButtonClick,
  className,
  ...props
}: ActionAccountBubbleProps) {
  const styles = actionAccountBubbleVariants();

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
        <Button
          size="small"
          className="w-full"
          disabled={buttonDisabled}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
