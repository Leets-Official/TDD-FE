export interface ReviewTagOption {
  id: number;
  label: string;
}

export const MANNER_TAGS: Record<"like" | "dislike", ReviewTagOption[]> = {
  like: [
    { id: 1, label: "시간 약속을 잘 지켜요" },
    { id: 2, label: "주문이 순조로워요" },
    { id: 3, label: "소통이 빨라요" },
    { id: 4, label: "친절해요" },
  ],
  dislike: [
    { id: 11, label: "답장이 느려요" },
    { id: 12, label: "불쾌한 말을 했어요" },
    { id: 13, label: "주문이 자주 바뀌었어요" },
    { id: 14, label: "정산이 제때 안되었어요" },
  ],
};

export const REPORT_TAGS: string[] = [
  "노쇼",
  "과도한 개인정보 요구",
  "원하지 않는 만남 요구",
  "욕설, 비방, 혐오표현",
];
