import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useBoardCommentList, useCreateBoardComment } from "@/api/board/query";
import { getApiErrorMessage } from "@/api/error";
import { API_ERROR_MESSAGE } from "@/constants/errorMessage";
import { useToast } from "@/hooks/useToast";
import type { BoardCommentListItem } from "@/types/board/board";

export function useBoardComments(postId: string | undefined) {
  const queryClient = useQueryClient();
  const commentsKey = ["board", "posts", postId, "comments"];

  const { data: comments = [] } = useBoardCommentList(postId);
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

  function handleSend(value: string, options?: { onSuccess?: () => void }) {
    const trimmed = value.trim();
    if (!trimmed || !postId) return;

    const parentCommentId = replyTargetId;
    const previousComments =
      queryClient.getQueryData<BoardCommentListItem[]>(commentsKey);

    queryClient.setQueryData<BoardCommentListItem[]>(commentsKey, (prev) => [
      ...(prev ?? []),
      {
        commentId: Date.now(),
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
        onSuccess: () => {
          options?.onSuccess?.();
        },
        onError: (error) => {
          queryClient.setQueryData(commentsKey, previousComments);
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
