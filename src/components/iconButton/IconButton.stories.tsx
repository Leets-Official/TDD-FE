import type { Meta, StoryObj } from "@storybook/react-vite";

import PlusIcon from "@/assets/icons/PlusIcon.svg?react";

import { IconButton } from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  args: {
    icon: <PlusIcon />,
    "aria-label": "추가",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["big", "large", "medium"],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-l">
      <IconButton {...args} size="big" />
      <IconButton {...args} size="large" />
      <IconButton {...args} size="medium" />
    </div>
  ),
};
