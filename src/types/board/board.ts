// 게시물 목록 조회 API
export interface BoardPostListItem {
  postId: number;
  title: string;
  authorNickname: string;
  // authorDong: string;
  commentCount: number;
  createdAt: string;
}

export interface BoardPostListResponse {
  posts: BoardPostListItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

// 게시물 작성 API
export interface CreateBoardPostRequest {
  title: string;
  content: string;
  // scope: "all" | "dong";
}

export interface CreateBoardPostResponse {
  postId: number;
}
