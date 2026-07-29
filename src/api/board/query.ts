import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBoardPost,
  getBoardPostDetail,
  getBoardPosts,
} from "@/api/board/api";
import type { GetBoardPostsParams } from "@/types/board/board";

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
