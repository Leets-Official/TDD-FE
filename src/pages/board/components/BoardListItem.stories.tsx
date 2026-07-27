import type { Meta, StoryObj } from "@storybook/react-vite";

import { BoardListItem } from "./BoardListItem";

const meta = {
  title: "BoardComponents/BoardListItem",
  component: BoardListItem,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "제목 제목 제목 제목 제목 제목 제목",
    content:
      "본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문",
    commentCount: 1,
    timeLabel: "56분 전",
    nickname: "닉네임",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 393 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BoardListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortContent: Story = {
  args: {
    title: "짧은 제목이에요",
    content: "본문도 짧은 경우입니다.",
    commentCount: 0,
  },
};
