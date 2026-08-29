import type { Meta, StoryObj } from "@storybook/react-vite";
import InputArea from "./InputArea";

const meta = { title: "Atoms/InputArea", component: InputArea, tags: ["autodocs"], argTypes: { variant: { control: "select", options: ["default", "error", "success"] }, size: { control: "select", options: ["default", "lg"] }, required: { control: "boolean" }, disabled: { control: "boolean" } } } satisfies Meta<typeof InputArea>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { id: "message", label: "Message", placeholder: "Write your message", description: "Keep it concise.", rows: 4 } };
export const ErrorState: Story = { args: { id: "details", label: "Details", value: "Incomplete", variant: "error", description: "Please add more detail.", required: true, readOnly: true } };
