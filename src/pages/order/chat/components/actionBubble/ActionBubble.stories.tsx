import type { Meta, StoryObj } from "@storybook/react-vite";

import { ActionBubble } from "./ActionBubble";

const meta = {
  title: "ChatComponents/ActionBubble",
  component: ActionBubble,
  parameters: {
    layout: "centered",
  },
  args: {
    requesterName: "방장",
    primaryText: "우리 1002-323-1324",
    secondaryText: "김*수",
  },
} satisfies Meta<typeof ActionBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
