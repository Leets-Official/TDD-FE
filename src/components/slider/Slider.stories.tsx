import type { Meta, StoryObj } from "@storybook/react-vite";

import { Slider } from "./Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  args: {
    min: 2,
    max: 6,
  },
  render: (args) => (
    <div className="w-87">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PartialRange: Story = {
  args: {
    defaultValue: [3, 5],
  },
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
    defaultValue: [2, 4],
  },
};
