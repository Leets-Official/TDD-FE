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

  const { data: comments = [], isPending: isCommentsPending } =
    useBoardCommentList(postId);
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const { mutate: createComment, isPending: isSending } =
    useCreateBoardComment(postId);
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

  async function handleSend(
    value: string,
    options?: { onSuccess?: () => void }
  ) {
    const trimmed = value.trim();
    if (!trimmed || !postId || isSending) return;

    const parentCommentId = replyTargetId;

    // 진행 중인 댓글 조회가 낙관적 캐시 갱신을 덮어쓰지 않도록 먼저 취소
    await queryClient.cancelQueries({ queryKey: commentsKey, exact: true });
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
    isCommentsPending,
    topLevelComments,
    getReplies,
    replyTargetId,
    handleReplyClick,
    handleSend,
  };
}
