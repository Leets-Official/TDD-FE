import { useState } from "react";

import { useCreateBoardComment } from "@/api/board/query";
import { getApiErrorMessage } from "@/api/error";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import type { BoardCommentListItem } from "@/types/board/board";

import { boardComments as initialBoardComments } from "../boardDetail.mock";

export function useBoardComments(postId: string | undefined) {
  const [comments, setComments] = useState<BoardCommentListItem[]>(
    (postId && initialBoardComments[postId]) || []
  );
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const { mutate: createComment } = useCreateBoardComment(postId);
  const { openToast } = useToast();

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
    if (!trimmed || !postId) return;

    const parentCommentId = replyTargetId;
    const tempCommentId = Date.now();

    setComments((prev) => [
      ...prev,
      {
        commentId: tempCommentId,
        parentCommentId,
        content: trimmed,
        authorNickname: "나",
        createdAt: new Date().toISOString(),
      },
    ]);
    setReplyTargetId(null);

    createComment(
      { content: trimmed, parentCommentId },
      {
        onSuccess: (commentId) => {
          setComments((prev) =>
            prev.map((comment) =>
              comment.commentId === tempCommentId
                ? { ...comment, commentId }
                : comment
            )
          );
        },
        onError: (error) => {
          setComments((prev) =>
            prev.filter((comment) => comment.commentId !== tempCommentId)
          );
          openToast({
            message: getApiErrorMessage(
              error,
              API_ERROR_MESSAGE.BOARD_COMMENT_CREATE
            ),
          });
        },
      }
    );
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
