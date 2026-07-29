import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBoardComment,
  createBoardPost,
  getBoardComments,
  getBoardPostDetail,
  getBoardPosts,
} from "@/api/board/api";
import type {
  CreateBoardCommentRequest,
  GetBoardPostsParams,
} from "@/types/board/board";

// 게시물 목록 조회 API
export const useBoardPosts = (params?: GetBoardPostsParams) => {
  return useQuery({
    queryKey: ["board", "posts", params],
    queryFn: () => getBoardPosts(params),
  });
};

// 게시물 상세 조회 API
export const useBoardPostDetail = (postId: string | undefined) => {
  return useQuery({
    queryKey: ["board", "posts", postId],
    queryFn: () => getBoardPostDetail(postId!),
    enabled: !!postId,
  });
};

// 게시물 작성 API
export const useCreateBoardPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoardPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "posts"] });
    },
  });
};

// 댓글 목록 조회 API
export const useBoardCommentList = (postId: string | undefined) => {
  return useQuery({
    queryKey: ["board", "posts", postId, "comments"],
    queryFn: () => getBoardComments(postId!),
    enabled: !!postId,
  });
};

// 댓글 등록 API
export const useCreateBoardComment = (postId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateBoardCommentRequest) =>
      createBoardComment(postId!, body),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "posts"] });
    },
  });
};
