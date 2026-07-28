import type { AvatarGroupItem } from "@/components/avatar/AvatarGroup";
import type { CardProps } from "@/components/card/Card";

export interface OrderItem extends CardProps {
  id: string;
}

const avatars: AvatarGroupItem[] = [
  { id: "1", src: "https://i.pravatar.cc/96?img=1", alt: "참여자 1" },
  { id: "2", src: "https://i.pravatar.cc/96?img=2", alt: "참여자 2" },
  { id: "3", src: "https://i.pravatar.cc/96?img=3", alt: "참여자 3" },
];

export const inProgressOrders: OrderItem[] = [
  {
    id: "my-order-1",
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
    id: "my-order-2",
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
    id: "my-order-3",
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

export const pastOrders: OrderItem[] = [
  {
    id: "past-order-1",
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
    id: "past-order-2",
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
    id: "past-order-3",
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
