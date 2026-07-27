import { Avatar } from "@/components/avatar/Avatar";

import { boardAuthorRowVariants } from "./BoardAuthorRow.variants";

export interface BoardAuthorRowProps {
  nickname: string;
  timeLabel: string;
  variant?: "post" | "comment";
}

const AVATAR_SIZE = { post: 48, comment: 36 } as const;

export function BoardAuthorRow({
  nickname,
  timeLabel,
  variant = "comment",
}: BoardAuthorRowProps) {
  const {
    root,
    texts,
    nickname: nicknameStyle,
    time,
  } = boardAuthorRowVariants({ variant });

  return (
    <div className={root()}>
      <Avatar size={AVATAR_SIZE[variant]} alt={nickname} />
      <div className={texts()}>
        <p className={nicknameStyle()}>{nickname}</p>
        <p className={time()}>{timeLabel}</p>
      </div>
    </div>
  );
}
