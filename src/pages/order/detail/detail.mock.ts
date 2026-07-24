import type { ProfilesItem } from "@/components/profiles/Profiles";

import type { FoodCategory } from "@/components/card/categoryIcons";

export interface PodDetail {
  id: string;
  category: FoodCategory;
  title: string;
  description: string;
  location: string;
  deadline: number;
  minCount: number;
  maxCount: number;
  host: ProfilesItem;
  participants: ProfilesItem[];
}

const HOST: ProfilesItem = {
  id: "host-1",
  nickname: "피자조아",
  temperature: 38.6,
};

// OrderDetailPage의 ME.id와 동일 — 이 값과 host.id가 같으면 방장(호스트) 뷰로 렌더링됩니다.
export const ME_HOST: ProfilesItem = {
  id: "me",
  nickname: "나",
  temperature: 36.5,
};

const PARTICIPANTS: ProfilesItem[] = [
  { id: "1", nickname: "치킨", temperature: 38.6 },
  { id: "2", nickname: "고구마", temperature: 40.2 },
  { id: "3", nickname: "감자", temperature: 12.4 },
];

export const podDetails: Record<string, PodDetail> = {
  "pod-1": {
    id: "pod-1",
    category: "패스트푸드",
    title: "OO햄버거 공구해요",
    description:
      "오늘 기숙사 학식 맛없고, 피자먹방보고 피자먹고 싶어서 같이 배달시키실분 구합니다\n40분 정도 걸려요\nOO앞에서 받을거에요. 추가메뉴, 옵션 제시 가능",
    location: "1기숙사",
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    minCount: 2,
    maxCount: 4,
    host: HOST,
    participants: PARTICIPANTS,
  },
  "pod-2": {
    id: "pod-2",
    category: "치킨",
    title: "치킨 반반 같이 시키실분",
    description: "치킨 반반이 땡겨서 같이 시킬 사람 구해요\n30분 정도 걸려요",
    location: "2기숙사",
    deadline: Date.now() + 20 * 60 * 1000,
    minCount: 2,
    maxCount: 4,
    host: HOST,
    participants: PARTICIPANTS.slice(0, 2),
  },
  "pod-3": {
    id: "pod-3",
    category: "카페(디저트)",
    title: "카페 디저트 같이 주문하실분",
    description: "디저트 카페 같이 주문할 사람 구해요",
    location: "1기숙사",
    deadline: Date.now() + 45 * 60 * 1000,
    minCount: 2,
    maxCount: 3,
    host: HOST,
    participants: PARTICIPANTS,
  },
};

export function createPodDetail(
  input: Omit<PodDetail, "id" | "host" | "participants" | "deadline"> & {
    orderTimeMinutes: number;
  }
): PodDetail {
  const { orderTimeMinutes, ...rest } = input;
  const now = Date.now();
  const detail: PodDetail = {
    ...rest,
    id: `pod-${now}`,
    deadline: now + orderTimeMinutes * 60 * 1000,
    host: ME_HOST,
    // 생성자를 방장이자 첫 번째 참여자로 등록합니다.
    participants: [ME_HOST],
  };
  podDetails[detail.id] = detail;
  return detail;
}
