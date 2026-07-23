import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionBubble } from "./ActionBubble";

const meta = {
  title: "ChatComponents/ActionBubble",
  component: ActionBubble,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "방장님이 정산을 요청하였습니다!",
    primaryText: "우리 1002-323-1324",
    secondaryText: "김*수",
    buttonLabel: "복사",
  },
} satisfies Meta<typeof ActionBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutButton: Story = {
  args: {
    title: "정산을 요청하였습니다!",
    buttonLabel: undefined,
  },
};
