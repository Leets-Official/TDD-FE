import type { AvatarGroupItem } from "@/components/avatar/AvatarGroup";
import type { CardProps } from "@/components/card/Card";

export interface PodItem extends CardProps {
  id: string;
}

const avatars: AvatarGroupItem[] = [
  { id: "1", src: "https://i.pravatar.cc/96?img=1", alt: "참여자 1" },
  { id: "2", src: "https://i.pravatar.cc/96?img=2", alt: "참여자 2" },
  { id: "3", src: "https://i.pravatar.cc/96?img=3", alt: "참여자 3" },
];

export const recruitingPods: PodItem[] = [
  {
    id: "pod-1",
    category: "패스트푸드",
    title: "OO햄버거 같이 배달하실분",
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    avatars: avatars.slice(0, 3),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
  {
    id: "pod-2",
    category: "치킨",
    title: "치킨 반반 같이 시키실분",
    deadline: Date.now() + 20 * 60 * 1000,
    avatars: avatars.slice(0, 2),
    minCount: 2,
    maxCount: 4,
    location: "2기숙사",
  },
  {
    id: "pod-3",
    category: "카페(디저트)",
    title: "카페 디저트 같이 주문하실분",
    deadline: Date.now() + 45 * 60 * 1000,
    avatars: avatars.slice(0, 1),
    minCount: 2,
    maxCount: 3,
    location: "1기숙사",
  },
];

export const inProgressPods: PodItem[] = [
  {
    id: "my-pod-1",
    category: "패스트푸드",
    title: "OO햄버거 같이 배달하실분",
    status: "recruiting",
    deadline: Date.now() + 10 * 60 * 1000,
    avatars: avatars.slice(0, 3),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
  {
    id: "my-pod-2",
    category: "패스트푸드",
    title: "OO햄버거 같이 배달하실분",
    status: "matched",
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    avatars: avatars.slice(0, 3),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
  {
    id: "my-pod-3",
    category: "패스트푸드",
    title: "OO햄버거 같이 배달하실분",
    status: "arrived",
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    avatars: avatars.slice(0, 3),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
];

export const pastPods: PodItem[] = [
  {
    id: "past-pod-1",
    category: "패스트푸드",
    title: "OO햄버거 같이 배달하실분",
    status: "cancelled",
    deadline: Date.now() - 60 * 1000,
    avatars: avatars.slice(0, 3),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
  {
    id: "past-pod-2",
    category: "패스트푸드",
    title: "OO햄버거 같이 배달하실분",
    status: "cancelled",
    deadline: Date.now() - 60 * 1000,
    avatars: avatars.slice(0, 3),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
  {
    id: "past-pod-3",
    category: "패스트푸드",
    title: "OO햄버거 같이 배달하실분",
    status: "arrived",
    deadline: Date.now() - 60 * 1000,
    avatars: avatars.slice(0, 3),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
];
