import type { Meta, StoryObj } from "@storybook/react-vite";

import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "직접입력",
    placeholder: "직접입력",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-87">
      <Textarea {...args} />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: { label: undefined, "aria-label": "내용" },
  render: (args) => (
    <div className="w-87">
      <Textarea {...args} />
    </div>
  ),
};
