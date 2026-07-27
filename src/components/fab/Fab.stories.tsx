import type { Meta, StoryObj } from "@storybook/react-vite";

import { Fab } from "./Fab";

const meta = {
  title: "Components/Fab",
  component: Fab,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "버튼",
  },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    "aria-label": "추가",
  },
};
