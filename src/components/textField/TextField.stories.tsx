import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button/Button";

import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "라벨",
    placeholder: "내용을 입력하세요",
    feedback: "피드백",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "error"],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: { label: undefined },
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};

export const WithoutFeedback: Story = {
  args: { feedback: undefined },
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};

export const WithoutLabelAndFeedback: Story = {
  args: { label: undefined, feedback: undefined },
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};

export const Password: Story = {
  args: { type: "password", label: "비밀번호", feedback: "피드백" },
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};

export const WithButton: Story = {
  args: {
    label: undefined,
    placeholder: "이메일을 입력하세요",
    feedback: undefined,
    defaultValue: "gachon123@gachon.ac.kr",
    rightElement: (
      <Button size="small" className="shrink-0">
        인증코드 받기
      </Button>
    ),
  },
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    state: "error",
    feedback: "올바른 형식으로 입력해주세요",
    defaultValue: "잘못된 값",
  },
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, feedback: "피드백" },
  render: (args) => (
    <div className="w-87">
      <TextField {...args} />
    </div>
  ),
};
