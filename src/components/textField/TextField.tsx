import {
  useId,
  useState,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";

import { type VariantProps } from "@/utils/cn";

import EyeIcon from "@/assets/icons/EyeIcon.svg?react";
import EyeOffIcon from "@/assets/icons/EyeOffIcon.svg?react";

import { textFieldVariants } from "./TextField.variants";

export interface TextFieldProps
  extends
    Omit<ComponentPropsWithRef<"input">, "size">,
    VariantProps<typeof textFieldVariants> {
  label?: string;
  feedback?: string;
  rightElement?: ReactNode;
  wrapperClassName?: string;
}

export function TextField({
  label,
  feedback,
  rightElement,
  state,
  type = "text",
  id,
  className,
  wrapperClassName,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  const {
    wrapper,
    label: labelClass,
    inputWrapper,
    input,
    iconButton,
    feedback: feedbackClass,
  } = textFieldVariants({ state });

  const passwordToggle = isPassword && (
    <button
      type="button"
      aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
      onClick={() => setShowPassword((prev) => !prev)}
      disabled={props.disabled}
      className={iconButton()}
    >
      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
    </button>
  );

  const resolvedRightElement =
    rightElement === undefined ? passwordToggle : rightElement;

  return (
    <div className={wrapper({ className: wrapperClassName })}>
      {label && (
        <label htmlFor={inputId} className={labelClass()}>
          {label}
        </label>
      )}
      <div className={inputWrapper()}>
        <input
          id={inputId}
          type={resolvedType}
          className={input({ className })}
          {...props}
        />
        {resolvedRightElement}
      </div>
      {feedback && <p className={feedbackClass()}>{feedback}</p>}
    </div>
  );
}
