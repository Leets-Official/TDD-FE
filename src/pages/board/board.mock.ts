import type { BoardListItemProps } from "./components/BoardListItem";

export interface BoardPost extends Omit<BoardListItemProps, "onClick"> {
  id: string;
}

export const boardPosts: BoardPost[] = [
  {
    id: "post-1",
    title: "택배 같이 받으실 분",
    content:
      "오늘 오후에 택배가 여러 개 와서 경비실까지 왕복하기 귀찮은데 혹시 같은 동에서 같이 받으실 분 계신가요? 무거운 건 아니고 상자 3개 정도예요.",
    commentCount: 3,
    timeLabel: "5분 전",
    nickname: "치즈조아",
  },
  {
    id: "post-2",
    title: "기숙사 근처 맛집 추천해주세요",
    content:
      "이번에 새로 입사(?)했는데 기숙사 주변에 갈만한 맛집이 있을까요? 배달 말고 직접 가서 먹을 만한 곳으로 추천 부탁드려요!",
    commentCount: 12,
    timeLabel: "32분 전",
    nickname: "새내기곰",
  },
  {
    id: "post-3",
    title: "세탁기 사용 시간 문의드립니다",
    content:
      "3층 세탁실 세탁기가 계속 사용 중이라고 뜨는데 혹시 고장난 건지 아시는 분 계신가요? 관리실에 문의해봐야 할지 고민이에요.",
    commentCount: 5,
    timeLabel: "1시간 전",
    nickname: "빨래요정",
  },
  {
    id: "post-4",
    title: "스터디 카페 자리 같이 쓰실 분",
    content:
      "중간고사 기간이라 스터디 카페 좌석이 너무 없네요. 4인 좌석 예약했는데 같이 앉아서 각자 공부하실 분 있으면 편하게 연락 주세요.",
    commentCount: 0,
    timeLabel: "2시간 전",
    nickname: "도서관죽순이",
  },
  {
    id: "post-5",
    title: "분리수거 요일 다시 한번 확인 부탁드려요",
    content:
      "이번 주부터 분리수거 요일이 바뀌었다고 들었는데 정확히 어떤 요일에 어떤 품목을 버려야 하는지 아시는 분 계시면 댓글로 알려주시면 감사하겠습니다.",
    commentCount: 2,
    timeLabel: "5시간 전",
    nickname: "환경지킴이",
  },
];
