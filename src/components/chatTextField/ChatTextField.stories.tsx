import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChatTextField } from "./ChatTextField";

const meta = {
  title: "Components/ChatTextField",
  component: ChatTextField,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "메시지 입력",
  },
} satisfies Meta<typeof ChatTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-87">
      <ChatTextField {...args} />
    </div>
  ),
};
