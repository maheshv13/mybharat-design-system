import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = { title: "Atoms/Input", component: Input, tags: ["autodocs"], argTypes: { variant: { control: "select", options: ["default", "error", "success", "filter"] }, size: { control: "select", options: ["default", "lg"] }, required: { control: "boolean" }, disabled: { control: "boolean" } } } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { id: "email", label: "Email address", type: "email", placeholder: "you@example.com", description: "We will only use this for account updates.", required: true } };
export const ValidationStates: Story = { render: () => <div style={{ display: "grid", gap: 16, maxWidth: 360 }}><Input id="valid" label="Validated" value="hello@example.com" variant="success" readOnly /><Input id="invalid" label="Needs attention" value="not-an-email" variant="error" description="Enter a valid email address." readOnly /><Input id="disabled" label="Disabled" placeholder="Unavailable" disabled /></div> };
