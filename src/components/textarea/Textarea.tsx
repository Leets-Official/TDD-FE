import { useId, type ComponentPropsWithRef } from "react";

import { textareaVariants } from "./Textarea.variants";

export interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  label?: string;
  wrapperClassName?: string;
}

export function Textarea({
  label,
  id,
  className,
  wrapperClassName,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  const { wrapper, label: labelClass, textarea } = textareaVariants();

  return (
    <div className={wrapper({ className: wrapperClassName })}>
      {label && (
        <label htmlFor={textareaId} className={labelClass()}>
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={4}
        className={textarea({ className })}
        {...props}
      />
    </div>
  );
}
