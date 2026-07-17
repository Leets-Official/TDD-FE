import type { Meta, StoryObj } from "@storybook/react-vite";

import { AvatarGroup, type AvatarGroupItem } from "./AvatarGroup";

const avatars: AvatarGroupItem[] = [
  { id: "1", src: "https://i.pravatar.cc/96?img=1", alt: "참여자 1" },
  { id: "2", src: "https://i.pravatar.cc/96?img=2", alt: "참여자 2" },
  { id: "3", src: "https://i.pravatar.cc/96?img=3", alt: "참여자 3" },
  { id: "4", src: "https://i.pravatar.cc/96?img=4", alt: "참여자 4" },
  { id: "5", src: "https://i.pravatar.cc/96?img=5", alt: "참여자 5" },
];

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  args: {
    avatars: avatars.slice(0, 3),
  },
  argTypes: {
    size: {
      control: "select",
      options: [56, 48, 40, 36, 24, 20, 15],
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithOverflow: Story = {
  args: {
    avatars,
  },
};

export const WithoutOverflow: Story = {
  args: {
    avatars: avatars.slice(0, 2),
  },
};

export const RecruitingOpenSlots: Story = {
  args: {
    avatars: avatars.slice(0, 3),
    total: 4,
  },
};

export const MixedProfileImages: Story = {
  args: {
    avatars: [
      { id: "1", src: "https://i.pravatar.cc/96?img=1", alt: "참여자 1" },
      { id: "2", alt: "참여자 2" },
      { id: "3", src: "https://i.pravatar.cc/96?img=3", alt: "참여자 3" },
      { id: "4", alt: "참여자 4" },
    ],
  },
};
