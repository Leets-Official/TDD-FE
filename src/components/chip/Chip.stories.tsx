import type { Meta, StoryObj } from "@storybook/react-vite";

import EditIcon from "@/assets/icons/EditIcon.svg?react";

import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Label",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <EditIcon className="size-4" />,
  },
};
