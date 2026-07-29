import { useQuery } from "@tanstack/react-query";

import { getBoardPosts } from "@/api/board/api";
import type { GetBoardPostsParams } from "@/types/board/board";

export const useBoardPosts = (params?: GetBoardPostsParams) => {
  return useQuery({
    queryKey: ["board", "posts", params],
    queryFn: () => getBoardPosts(params),
  });
};
