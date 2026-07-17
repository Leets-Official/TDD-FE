import { useState, type ComponentPropsWithRef } from "react";

import { switchVariants } from "./Switch.variants";

export interface SwitchProps extends Omit<
  ComponentPropsWithRef<"button">,
  "onChange" | "onClick" | "children"
> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  "aria-label": string;
}

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  className,
  ...props
}: SwitchProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const [isControlled] = useState(() => checked !== undefined);
  const isOn = isControlled ? (checked ?? false) : uncontrolled;

  const styles = switchVariants();

  function handleClick() {
    const next = !isOn;
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  }

  return (
    <button
      type="button"
      {...props}
      role="switch"
      aria-checked={isOn}
      data-checked={isOn}
      className={styles.track({ className })}
      onClick={handleClick}
    >
      <span className={styles.knob()} />
    </button>
  );
}
