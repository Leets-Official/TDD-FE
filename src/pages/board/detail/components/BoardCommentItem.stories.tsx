import type { Meta, StoryObj } from "@storybook/react-vite";

import { BoardCommentItem } from "./BoardCommentItem";

const meta = {
  title: "BoardComponents/BoardCommentItem",
  component: BoardCommentItem,
  parameters: {
    layout: "centered",
  },
  args: {
    nickname: "피자조아",
    content:
      "본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문",
    timeLabel: "56분 전",
    replies: [],
    onReplyClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: 393 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BoardCommentItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoReply: Story = {};

export const WithReply: Story = {
  args: {
    replies: [
      {
        commentId: "comment-1-reply-1",
        nickname: "치즈조아",
        content:
          "본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문 본문",
        timeLabel: "50분 전",
      },
    ],
  },
};

export const Highlighted: Story = {
  args: {
    isHighlighted: true,
  },
};
