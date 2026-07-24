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
