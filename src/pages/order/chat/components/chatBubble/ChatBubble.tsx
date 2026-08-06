import type { ComponentPropsWithRef } from "react";
import { useState } from "react";

import ImageUpIcon from "@/assets/icons/ImageUpIcon.svg?react";
import { Avatar } from "@/components/avatar/Avatar";
import { type VariantProps } from "@/utils/cn";

import { chatBubbleVariants } from "./ChatBubble.variants";

export interface ChatBubbleProps
  extends
    Omit<ComponentPropsWithRef<"div">, "children">,
    VariantProps<typeof chatBubbleVariants> {
  message?: string;
  imageUrl?: string | null;
  time?: string;
  nickname?: string;
  avatarSrc?: string;
}

export function ChatBubble({
  message,
  imageUrl,
  time,
  isMine,
  nickname,
  avatarSrc,
  className,
  ...props
}: ChatBubbleProps) {
  const isContinuation = !isMine && !nickname;
  const styles = chatBubbleVariants({ isMine, continuation: isContinuation });
  // 로드 실패 시 대체 이미지로 표시
  const [imageFailed, setImageFailed] = useState(false);

  let bubble: React.ReactNode;
  if (imageUrl && !imageFailed) {
    bubble = (
      <img
        src={imageUrl}
        alt="전송된 사진"
        className={styles.image()}
        onError={() => setImageFailed(true)}
      />
    );
  } else if (imageUrl) {
    bubble = (
      <div className={styles.imageFallback()}>
        <ImageUpIcon className="size-6 text-text-4" />
      </div>
    );
  } else {
    bubble = (
      <div className={styles.bubble()}>
        <p className={styles.message()}>{message}</p>
      </div>
    );
  }

  if (!nickname) {
    return (
      <div className={styles.wrapper({ className })} {...props}>
        {!isMine && bubble}
        {time && <p className={styles.time()}>{time}</p>}
        {isMine && bubble}
      </div>
    );
  }

  return (
    <div className={styles.profile({ className })} {...props}>
      <Avatar src={avatarSrc} alt={nickname} size={48} />
      <div className={styles.textColumn()}>
        <p className={styles.nickname()}>{nickname}</p>
        <div className={styles.wrapper()}>
          {!isMine && bubble}
          {time && <p className={styles.time()}>{time}</p>}
          {isMine && bubble}
        </div>
      </div>
    </div>
  );
}
