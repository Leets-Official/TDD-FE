import type { Meta, StoryObj } from "@storybook/react-vite";

import type { AvatarGroupItem } from "@/components/avatar/AvatarGroup";

import { Card } from "./Card";

const avatars: AvatarGroupItem[] = [
  { id: "1", src: "https://i.pravatar.cc/96?img=1", alt: "참여자 1" },
  { id: "2", src: "https://i.pravatar.cc/96?img=2", alt: "참여자 2" },
  { id: "3", src: "https://i.pravatar.cc/96?img=3", alt: "참여자 3" },
];

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "OO햄버거 같이 배달하실분",
    avatars: avatars.slice(0, 2),
    minCount: 2,
    maxCount: 4,
    location: "1기숙사",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    avatars,
  },
};

export const Recruiting: Story = {
  args: {
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    status: "recruiting",
    avatars,
  },
};

export const TimeUrgent: Story = {
  args: {
    deadline: Date.now() + 32 * 1000,
    status: "recruiting",
  },
};

export const CountUrgent: Story = {
  args: {
    deadline: Date.now() + 7 * 60 * 1000,
    avatars,
    maxCount: 4,
    status: "recruiting",
    minCount: 0,
  },
};

export const TimeAndCountUrgent: Story = {
  args: {
    deadline: Date.now() + 32 * 1000,
    avatars,
    maxCount: 4,
    status: "recruiting",
    minCount: 1,
  },
};

export const AutoCancelled: Story = {
  args: {
    deadline: Date.now() - 60 * 1000,
    status: "recruiting",
  },
};

export const Matched: Story = {
  args: {
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    status: "matched",
  },
};

export const Arrived: Story = {
  args: {
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    status: "arrived",
  },
};

export const Cancelled: Story = {
  args: {
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    status: "cancelled",
  },
};
