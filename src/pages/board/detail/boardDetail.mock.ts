import type {
  BoardCommentListItem,
  BoardPostDetail,
} from "@/types/board/board";

import { boardPosts } from "../board.mock";

const MINUTE = 60 * 1000;

function minutesAgo(minutes: number) {
  return new Date(Date.now() - minutes * MINUTE).toISOString();
}

const POST_MINUTES_AGO = [5, 32, 60, 120, 300];

// 목록 mock(boardPosts)에 있는거 재사용
export const boardPostDetails: Record<string, BoardPostDetail> =
  Object.fromEntries(
    boardPosts.map((post, index) => [
      post.id,
      {
        postId: index + 1,
        title: post.title,
        content: post.content,
        authorNickname: post.nickname,
        createdAt: minutesAgo(POST_MINUTES_AGO[index] ?? 0),
      } satisfies BoardPostDetail,
    ])
  );

// 댓글 목록 조회 API 응답- parentCommentId로 대댓글 구분
export const boardComments: Record<string, BoardCommentListItem[]> = {
  "post-1": [
    {
      commentId: 1,
      parentCommentId: null,
      content: "저요! 혹시 몇 동 사세요?",
      authorNickname: "피자조아",
      createdAt: minutesAgo(4),
    },
    {
      commentId: 2,
      parentCommentId: 1,
      content: "3동이요! 감사합니다 :) 경비실 앞에서 뵐게요",
      authorNickname: "치즈조아",
      createdAt: minutesAgo(3),
    },
    {
      commentId: 3,
      parentCommentId: null,
      content: "저도 택배 기다리고 있었는데 같이 받을게요!",
      authorNickname: "새내기곰",
      createdAt: minutesAgo(2),
    },
    {
      commentId: 4,
      parentCommentId: null,
      content: "부럽네요 저도 다음에 같이 받고 싶어요 ㅎㅎ",
      authorNickname: "빨래요정",
      createdAt: minutesAgo(1),
    },
  ],
};
