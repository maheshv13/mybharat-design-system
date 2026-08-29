import type { Meta, StoryObj } from "@storybook/react-vite";
import Checkbox from "./Checkbox";

const meta = { title: "Atoms/Checkbox", component: Checkbox, tags: ["autodocs"], argTypes: { labelPosition: { control: "select", options: ["right", "left"] }, checked: { control: "boolean" }, disabled: { control: "boolean" }, required: { control: "boolean" } } } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { id: "updates", label: "Send me updates", name: "updates" } };
export const States: Story = { render: () => <div style={{ display: "grid", gap: 12 }}><Checkbox id="selected" label="Selected option" checked /><Checkbox id="required" label="Required option" required /><Checkbox id="disabled" label="Unavailable option" disabled /></div> };
