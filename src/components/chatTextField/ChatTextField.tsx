import { useId, type ComponentPropsWithRef } from "react";

import { chatTextFieldVariants } from "./ChatTextField.variants";

export interface ChatTextFieldProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size"
> {
  wrapperClassName?: string;
}

export function ChatTextField({
  id,
  className,
  wrapperClassName,
  ...props
}: ChatTextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const { wrapper, inputWrapper, input } = chatTextFieldVariants();

  return (
    <div className={wrapper({ className: wrapperClassName })}>
      <div className={inputWrapper()}>
        <input id={inputId} className={input({ className })} {...props} />
      </div>
    </div>
  );
}
