import type { ComponentPropsWithRef } from "react";

import { Button } from "@/components/button/Button";

import { actionDeliveryBubbleVariants } from "./ActionDeliveryBubble.variants";

export interface ActionDeliveryBubbleProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children"
> {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
}

export function ActionDeliveryBubble({
  title,
  description,
  buttonLabel,
  buttonDisabled,
  onButtonClick,
  className,
  ...props
}: ActionDeliveryBubbleProps) {
  const styles = actionDeliveryBubbleVariants();

  return (
    <div className={styles.wrapper({ className })} {...props}>
      <div className={styles.content()}>
        <p className={styles.title()}>{title}</p>
        <p className={styles.description()}>{description}</p>
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
