export interface BoardCommentReply {
  commentId: string;
  nickname: string;
  content: string;
  timeLabel: string;
}

export interface BoardComment {
  commentId: string;
  nickname: string;
  content: string;
  timeLabel: string;
  replies: BoardCommentReply[];
}

export const boardComments: Record<string, BoardComment[]> = {
  "post-1": [
    {
      commentId: "comment-1",
      nickname: "피자조아",
      content: "저요! 혹시 몇 동 사세요?",
      timeLabel: "56분 전",
      replies: [
        {
          commentId: "comment-1-reply-1",
          nickname: "치즈조아",
          content:
            "3동이요! 감사합니다 :) 경비실 앞에서 뵐게요 3동이요! 감사합니다 :) 경비실 앞에서 뵐게요",
          timeLabel: "50분 전",
        },
      ],
    },
    {
      commentId: "comment-2",
      nickname: "새내기곰",
      content: "저도 택배 기다리고 있었는데 같이 받을게요!",
      timeLabel: "40분 전",
      replies: [],
    },
    {
      commentId: "comment-3",
      nickname: "빨래요정",
      content: "부럽네요 저도 다음에 같이 받고 싶어요 ㅎㅎ",
      timeLabel: "30분 전",
      replies: [],
    },
  ],
};
