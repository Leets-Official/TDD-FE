import MessageCircleIcon from "@/assets/icons/MessageCircleIcon.svg?react";

import { boardListItemVariants } from "./BoardListItem.variants";

export interface BoardListItemProps {
  title: string;
  content: string;
  commentCount: number;
  timeLabel: string;
  nickname: string;
  onClick?: () => void;
  className?: string;
}

export function BoardListItem({
  title,
  content,
  commentCount,
  timeLabel,
  nickname,
  onClick,
  className,
}: BoardListItemProps) {
  const {
    root,
    button,
    texts,
    title: titleStyle,
    content: contentStyle,
    detail,
    comment,
    commentIcon,
    dot,
    divider,
  } = boardListItemVariants();

  return (
    <div className={root({ class: className })}>
      <button type="button" className={button()} onClick={onClick}>
        <div className={texts()}>
          <h3 className={titleStyle()}>{title}</h3>
          <p className={contentStyle()}>{content}</p>
        </div>

        <div className={detail()}>
          <span className={comment()}>
            <MessageCircleIcon className={commentIcon()} aria-hidden="true" />
            {commentCount}
          </span>
          <span className={dot()} aria-hidden="true" />
          <span>{timeLabel}</span>
          <span className={dot()} aria-hidden="true" />
          <span>{nickname}</span>
        </div>
      </button>

      <div className={divider()} />
    </div>
  );
}
