import type { ChangeEvent, ComponentPropsWithRef, KeyboardEvent } from "react";
import { useRef } from "react";

import ArrowUpIcon from "@/assets/icons/ArrowUpIcon.svg?react";
import ImageUpIcon from "@/assets/icons/ImageUpIcon.svg?react";
import { ChatTextField } from "@/components/chatTextField/ChatTextField";
import { IconButton } from "@/components/iconButton/IconButton";
import { UPLOAD_IMAGE_ACCEPT } from "@/constants/imageUpload";

import { chatInputVariants } from "./ChatInput.variants";

export interface ChatInputProps extends Omit<
  ComponentPropsWithRef<"input">,
  "size" | "value" | "onChange"
> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSend?: (value: string) => void;
  onImagesSelected?: (files: File[]) => void;
  showImageUpload?: boolean;
  wrapperClassName?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onImagesSelected,
  showImageUpload = true,
  className,
  wrapperClassName,
  ...props
}: ChatInputProps) {
  const hasValue = value.length > 0;
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { wrapper, textField, sendButton } = chatInputVariants();

  const handleSend = () => {
    if (!hasValue) return;
    onSend?.(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    handleSend();
  };

  // 갤러리(OS 파일 선택창)에서 고른 이미지를 그대로 상위로 전달한다
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;
    onImagesSelected?.(files);
  };

  return (
    <div className={wrapper({ className: wrapperClassName })}>
      {showImageUpload && (
        <>
          <input
            ref={imageInputRef}
            type="file"
            accept={UPLOAD_IMAGE_ACCEPT}
            multiple
            hidden
            onChange={handleImageChange}
          />
          <IconButton
            icon={<ImageUpIcon />}
            aria-label="이미지 업로드"
            onClick={() => imageInputRef.current?.click()}
          />
        </>
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
