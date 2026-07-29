import { authInstance } from "@/api/instance";
import type { ApiResponse } from "@/types/api";
import type {
  BoardPostDetail,
  BoardPostListItem,
  CreateBoardPostRequest,
  CreateBoardPostResponse,
  GetBoardPostsParams,
} from "@/types/board/board";

export const getBoardPosts = async (params?: GetBoardPostsParams) => {
  const { data } = await authInstance.get<ApiResponse<BoardPostListItem[]>>(
    "/posts",
    { params }
  );

  return data.data;
};

export const getBoardPostDetail = async (postId: string | number) => {
  const { data } = await authInstance.get<ApiResponse<BoardPostDetail>>(
    `/posts/${postId}`
  );

  return data.data;
};

export const createBoardPost = async (body: CreateBoardPostRequest) => {
  const { data } = await authInstance.post<
    ApiResponse<CreateBoardPostResponse>
  >("/posts", body);

  return data.data;
};
