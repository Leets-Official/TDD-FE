import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBoardComment,
  createBoardPost,
  getBoardPostDetail,
  getBoardPosts,
} from "@/api/board/api";
import type {
  CreateBoardCommentRequest,
  GetBoardPostsParams,
} from "@/types/board/board";

export const useBoardPosts = (params?: GetBoardPostsParams) => {
  return useQuery({
    queryKey: ["board", "posts", params],
    queryFn: () => getBoardPosts(params),
  });
};

export const useBoardPostDetail = (postId: string | undefined) => {
  return useQuery({
    queryKey: ["board", "posts", postId],
    queryFn: () => getBoardPostDetail(postId!),
    enabled: !!postId,
  });
};

export const useCreateBoardPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoardPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "posts"] });
    },
  });
};

export const useCreateBoardComment = (postId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateBoardCommentRequest) =>
      createBoardComment(postId!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", "posts", postId] });
    },
  });
};
