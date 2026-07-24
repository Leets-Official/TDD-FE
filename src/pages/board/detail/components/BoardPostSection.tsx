import MessageCircleIcon from "@/assets/icons/MessageCircleIcon.svg?react";

import { BoardAuthorRow } from "./BoardAuthorRow";

export interface BoardPostSectionProps {
  title: string;
  content: string;
  commentCount: number;
  nickname: string;
  timeLabel: string;
}

export function BoardPostSection({
  title,
  content,
  commentCount,
  nickname,
  timeLabel,
}: BoardPostSectionProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full px-5">
        <BoardAuthorRow
          nickname={nickname}
          timeLabel={timeLabel}
          variant="post"
        />
      </div>

      <div className="flex w-full flex-col gap-9 px-5 pt-4 pb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-title-2 text-text-1">{title}</h1>
          <p className="text-body-1 whitespace-pre-line text-text-3">
            {content}
          </p>
        </div>

        <div className="flex items-center gap-1 text-caption-1 text-text-4">
          <MessageCircleIcon
            className="size-4 text-text-5"
            aria-hidden="true"
          />
          {commentCount}
        </div>
      </div>

      <div className="h-px w-full bg-divider-2" />
    </div>
  );
}
