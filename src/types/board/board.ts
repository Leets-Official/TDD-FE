// 게시물 목록 조회 API
export interface BoardPostListItem {
  postId: number;
  title: string;
  content: string;
  authorNickname: string;
  commentCount: number;
  createdAt: string;
}

export interface GetBoardPostsParams {
  size?: number;
}

// 게시물 작성 API
export interface CreateBoardPostRequest {
  title: string;
  content: string;
}

export type CreateBoardPostResponse = number;

// 게시물 상세 조회 API
export interface BoardPostDetail {
  postId: number;
  title: string;
  content: string;
  authorNickname: string;
  commentCount: number;
  createdAt: string;
}

// 댓글 목록 조회 API
export interface BoardCommentListItem {
  commentId: number;
  parentCommentId: number | null;
  content: string;
  authorNickname: string;
  createdAt: string;
}

// 댓글 등록 API
export interface CreateBoardCommentRequest {
  content: string;
  parentCommentId?: number | null;
}

export type CreateBoardCommentResponse = number;
