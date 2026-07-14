import type { Meta, StoryObj } from "@storybook/react-vite";

import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  args: {
    src: "https://i.pravatar.cc/96?img=1",
    alt: "참여자 프로필",
  },
  argTypes: {
    size: {
      control: "select",
      options: [56, 48, 40, 36, 24, 20, 15],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-l">
      {([56, 48, 40, 36, 24, 20, 15] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Fallback: Story = {
  args: {
    src: undefined,
    alt: "이미지 없는 참여자",
  },
};

export const LoadError: Story = {
  args: {
    src: "/missing-avatar.png",
    alt: "로드 실패 참여자",
  },
};
