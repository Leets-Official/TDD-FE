import type { Meta, StoryObj } from "@storybook/react-vite";

import { FlagBadge } from "./FlagBadge";

const meta = {
  title: "Components/Badge/FlagBadge",
  component: FlagBadge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "곧 끝나요!",
  },
} satisfies Meta<typeof FlagBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RemainingSlots: Story = {
  args: {
    children: "1자리 남았어요!",
  },
};
