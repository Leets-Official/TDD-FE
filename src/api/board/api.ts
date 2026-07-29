import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  BoardPostListItem,
  GetBoardPostsParams,
} from "@/types/board/board";

export const getBoardPosts = async (params?: GetBoardPostsParams) => {
  const { data } = await authInstance.get<ApiResponse<BoardPostListItem[]>>(
    "/posts",
    { params }
  );

  return data.data;
};
