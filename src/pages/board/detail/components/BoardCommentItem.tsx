import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";

import CornerDownRightIcon from "@/assets/icons/CornerDownRightIcon.svg?react";

import { BoardAuthorRow } from "./BoardAuthorRow";

export interface BoardCommentReplyView {
  commentId: number;
  nickname: string;
  content: string;
  timeLabel: string;
}

export interface BoardCommentItemProps {
  nickname: string;
  content: string;
  timeLabel: string;
  replies: BoardCommentReplyView[];
  isHighlighted?: boolean;
  onReplyClick: () => void;
}

function CommentBody({
  content,
  timeLabel,
}: {
  content: string;
  timeLabel: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-body-1 text-text-3">{content}</p>
      <p className="text-caption-1 text-text-4">{timeLabel}</p>
    </div>
  );
}

export function BoardCommentItem({
  nickname,
  content,
  timeLabel,
  replies,
  isHighlighted,
  onReplyClick,
}: BoardCommentItemProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={cn(
          "flex w-full flex-col items-start gap-2 px-5 pt-4",
          isHighlighted && "bg-hover"
        )}
      >
        <div className="flex w-full flex-col gap-1">
          <BoardAuthorRow nickname={nickname} timeLabel={timeLabel} />
          <CommentBody content={content} timeLabel={timeLabel} />
        </div>

        {/* 대댓글 */}
        {replies.map((reply) => (
          <div
            key={reply.commentId}
            className="flex w-full items-start gap-6 py-2 pl-5"
          >
            <CornerDownRightIcon
              className="size-6 shrink-0 text-text-4"
              aria-hidden="true"
            />
            <div className="flex flex-1 flex-col gap-1">
              <BoardAuthorRow
                nickname={reply.nickname}
                timeLabel={reply.timeLabel}
              />
              <CommentBody
                content={reply.content}
                timeLabel={reply.timeLabel}
              />
            </div>
          </div>
        ))}

        <Button
          variant="text"
          size="small"
          className="text-text-3"
          onClick={onReplyClick}
        >
          답글 달기
        </Button>
        <div className="h-px w-full bg-divider-1" />
      </div>
    </div>
  );
}
