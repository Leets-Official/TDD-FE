import type { ReportReason } from "@/types/order/review";

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

export interface ReportReasonOption {
  reason: ReportReason;
  label: string;
}

export const REPORT_REASONS: ReportReasonOption[] = [
  { reason: "NO_SHOW", label: "노쇼" },
  { reason: "ABUSIVE_LANGUAGE", label: "욕설, 비방, 혐오표현" },
  { reason: "UNPLEASANT_CHAT", label: "불쾌한 대화" },
  { reason: "PERSONAL_INFO_DEMAND", label: "과도한 개인정보 요구" },
  { reason: "ETC", label: "기타" },
];
