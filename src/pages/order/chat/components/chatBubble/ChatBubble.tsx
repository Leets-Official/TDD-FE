import type { ComponentPropsWithRef } from "react";

import { Avatar } from "@/components/avatar/Avatar";
import { type VariantProps } from "@/utils/cn";

import { chatBubbleVariants } from "./ChatBubble.variants";

export interface ChatBubbleProps
  extends
    Omit<ComponentPropsWithRef<"div">, "children">,
    VariantProps<typeof chatBubbleVariants> {
  message: string;
  time?: string;
  nickname?: string;
  avatarSrc?: string;
}

export function ChatBubble({
  message,
  time,
  isMine,
  nickname,
  avatarSrc,
  className,
  ...props
}: ChatBubbleProps) {
  const isContinuation = !isMine && !nickname;
  const styles = chatBubbleVariants({ isMine, continuation: isContinuation });

  const bubble = (
    <div className={styles.bubble()}>
      <p className={styles.message()}>{message}</p>
    </div>
  );

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
