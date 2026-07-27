import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChatBubble } from "./ChatBubble";

const meta = {
  title: "ChatComponents/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "centered",
  },
  args: {
    message: "안녕하세요",
    time: "오후 06:30",
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Other: Story = {
  args: {
    isMine: false,
  },
};

export const Mine: Story = {
  args: {
    isMine: true,
  },
};

export const WithoutTime: Story = {
  args: {
    isMine: false,
    time: undefined,
  },
};

export const WithProfile: Story = {
  args: {
    isMine: false,
    nickname: "닉네임",
    avatarSrc: "https://i.pravatar.cc/96?img=1",
  },
};
