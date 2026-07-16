import type { Meta, StoryObj } from "@storybook/react-vite";

import { HomeHeader } from "./HomeHeader";

const meta = {
  title: "Components/HomeHeader",
  component: HomeHeader,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
