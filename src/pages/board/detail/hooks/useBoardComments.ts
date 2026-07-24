import { useState } from "react";

import type { BoardCommentListItem } from "@/types/board/board";

import { boardComments as initialBoardComments } from "../boardDetail.mock";

export function useBoardComments(postId: string | undefined) {
  const [comments, setComments] = useState<BoardCommentListItem[]>(
    (postId && initialBoardComments[postId]) || []
  );
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);

  const topLevelComments = comments.filter(
    (comment) => comment.parentCommentId === null
  );

  function getReplies(parentCommentId: number) {
    return comments.filter(
      (comment) => comment.parentCommentId === parentCommentId
    );
  }

  function handleReplyClick(commentId: number) {
    setReplyTargetId((prev) => (prev === commentId ? null : commentId));
  }

  function handleSend(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    const newComment: BoardCommentListItem = {
      commentId: Date.now(),
      parentCommentId: replyTargetId,
      content: trimmed,
      authorNickname: "나",
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);
    setReplyTargetId(null);
  }

  return {
    comments,
    topLevelComments,
    getReplies,
    replyTargetId,
    handleReplyClick,
    handleSend,
  };
}
