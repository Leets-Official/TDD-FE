import type { Meta, StoryObj } from "@storybook/react-vite";

import type { AvatarGroupItem } from "@/components/avatar/AvatarGroup";

import { CtaBar, type CtaBarProps } from "./CtaBar";

const avatars: AvatarGroupItem[] = [
  { id: "1", src: "https://i.pravatar.cc/96?img=1", alt: "참여자 1" },
  { id: "2", src: "https://i.pravatar.cc/96?img=2", alt: "참여자 2" },
  { id: "3", src: "https://i.pravatar.cc/96?img=3", alt: "참여자 3" },
  { id: "4", src: "https://i.pravatar.cc/96?img=4", alt: "참여자 4" },
];

const meta: Meta<CtaBarProps> = {
  title: "Components/CtaBar",
  component: CtaBar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<CtaBarProps>;

export const Recruiting: Story = {
  args: {
    status: "recruiting",
    avatars: avatars.slice(0, 2),
    maxCount: 4,
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    onApply: () => {},
  },
};

export const Applied: Story = {
  args: {
    status: "applied",
    avatars: avatars.slice(0, 3),
    maxCount: 4,
    deadline: Date.now() + 7 * 60 * 1000 + 32 * 1000,
    onCancel: () => {},
  },
};

export const TimeUrgent: Story = {
  args: {
    status: "recruiting",
    avatars: avatars.slice(0, 2),
    maxCount: 4,
    deadline: Date.now() + 32 * 1000,
    onApply: () => {},
  },
};

export const Expired: Story = {
  args: {
    status: "recruiting",
    avatars: avatars.slice(0, 2),
    maxCount: 4,
    deadline: Date.now() - 1000,
    onApply: () => {},
  },
};

export const Completed: Story = {
  args: {
    status: "completed",
    avatars,
    maxCount: 4,
    onEnterChat: () => {},
  },
};

export const Full: Story = {
  args: {
    status: "full",
  },
};
