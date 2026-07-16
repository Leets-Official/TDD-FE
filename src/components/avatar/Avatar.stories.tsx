import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar, type AvatarProps } from "./Avatar";

const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: [56, 48, 40, 36, 24, 20, 15],
    },
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/96?img=1",
    alt: "참여자 프로필",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-l">
      {([56, 48, 40, 36, 24, 20, 15] as const).map((size) => (
        <Avatar
          key={size}
          src="https://i.pravatar.cc/96?img=1"
          alt="참여자 프로필"
          size={size}
        />
      ))}
    </div>
  ),
};

export const Fallback: Story = {
  args: {
    alt: "이미지 없는 참여자",
  },
};

export const LoadError: Story = {
  args: {
    src: "/missing-avatar.png",
    alt: "로드 실패 참여자",
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};
