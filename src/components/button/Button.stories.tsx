import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "버튼",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "text", "secondary"],
    },
    size: {
      control: "select",
      options: ["medium", "small"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-l">
      <Button {...args} size="medium" />
      <Button {...args} size="small" />
    </div>
  ),
};

export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <div className="flex items-center gap-l">
      <Button {...args} size="medium" />
      <Button {...args} size="small" />
    </div>
  ),
};

export const Text: Story = {
  args: { variant: "text" },
  render: (args) => (
    <div className="flex items-center gap-l">
      <Button {...args} size="medium" />
      <Button {...args} size="small" />
    </div>
  ),
};

export const Secondary: Story = {
  args: { variant: "secondary" },
  render: (args) => (
    <div className="flex items-center gap-l">
      <Button {...args} size="medium" />
      <Button {...args} size="small" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex flex-col gap-l">
      {(["default", "outline", "text", "secondary"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-l">
          <Button {...args} variant={variant} size="medium" />
          <Button {...args} variant={variant} size="small" />
        </div>
      ))}
    </div>
  ),
};
