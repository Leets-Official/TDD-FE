import { useState } from "react";

import {
  boardComments as initialBoardComments,
  type BoardComment,
} from "../boardDetail.mock";

export function useBoardComments(postId: string | undefined) {
  const [comments, setComments] = useState<BoardComment[]>(
    (postId && initialBoardComments[postId]) || []
  );
  const [replyTargetId, setReplyTargetId] = useState<string | null>(null);

  // 답글 달기 버튼 클릭 시 실행 함수 - 같은 댓글을 다시 누르면 답글 대상 해제
  function handleReplyClick(commentId: string) {
    setReplyTargetId((prev) => (prev === commentId ? null : commentId));
  }

  function handleSend(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (replyTargetId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.commentId === replyTargetId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    commentId: `${comment.commentId}-reply-${Date.now()}`,
                    nickname: "나",
                    content: trimmed,
                    timeLabel: "방금 전",
                  },
                ],
              }
            : comment
        )
      );
      setReplyTargetId(null);
    } else {
      setComments((prev) => [
        ...prev,
        {
          commentId: `comment-${Date.now()}`,
          nickname: "나",
          content: trimmed,
          timeLabel: "방금 전",
          replies: [],
        },
      ]);
    }
  }

  return { comments, replyTargetId, handleReplyClick, handleSend };
}
