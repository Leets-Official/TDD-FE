import type { ChangeEvent, ComponentPropsWithRef, KeyboardEvent } from "react";

import ArrowUpIcon from "@/assets/icons/ArrowUpIcon.svg?react";
import ImageUpIcon from "@/assets/icons/ImageUpIcon.svg?react";
import { ChatTextField } from "@/components/chatTextField/ChatTextField";
import { IconButton } from "@/components/iconButton/IconButton";

import { chatInputVariants } from "./ChatInput.variants";

export interface ChatInputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size" | "value" | "onChange"
> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSend?: (value: string) => void;
  onImageUpload?: () => void;
  showImageUpload?: boolean;
  wrapperClassName?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onImageUpload,
  showImageUpload = true,
  className,
  wrapperClassName,
  ...props
}: ChatInputProps) {
  const hasValue = value.length > 0;

  const { wrapper, textField, sendButton } = chatInputVariants();

  const handleSend = () => {
    if (!hasValue) return;
    onSend?.(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    handleSend();
  };

  return (
    <div className={wrapper({ className: wrapperClassName })}>
      {showImageUpload && (
        <IconButton
          icon={<ImageUpIcon />}
          aria-label="이미지 업로드"
          onClick={onImageUpload}
        />
      )}
      <ChatTextField
        wrapperClassName={textField()}
        className={className}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
      <IconButton
        icon={<ArrowUpIcon />}
        aria-label="전송"
        className={sendButton()}
        onClick={handleSend}
        disabled={!hasValue}
      />
    </div>
  );
}
