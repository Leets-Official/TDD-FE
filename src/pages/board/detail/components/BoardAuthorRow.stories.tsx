import type { Meta, StoryObj } from "@storybook/react-vite";

import { BoardAuthorRow } from "./BoardAuthorRow";

const meta = {
  title: "BoardComponents/BoardAuthorRow",
  component: BoardAuthorRow,
  parameters: {
    layout: "centered",
  },
  args: {
    nickname: "피자조아",
    timeLabel: "56분 전",
  },
} satisfies Meta<typeof BoardAuthorRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Post: Story = {
  args: {
    variant: "post",
  },
};

export const Comment: Story = {
  args: {
    variant: "comment",
  },
};
