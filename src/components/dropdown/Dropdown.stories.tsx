import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dropdown, type DropdownOption } from "./Dropdown";

const options: DropdownOption[] = [
  { label: "사과", value: "apple" },
  { label: "바나나", value: "banana" },
  { label: "오렌지", value: "orange" },
  { label: "포도", value: "grape" },
  { label: "수박", value: "watermelon" },
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "라벨",
    options,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["select", "filter"],
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {
    multiple: true,
    defaultValue: ["apple", "banana"],
  },
};

export const Filter: Story = {
  args: {
    variant: "filter",
    label: "필터",
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="flex items-start gap-l">
      {(["select", "filter"] as const).map((variant) => (
        <Dropdown key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
};
