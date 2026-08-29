import type { Meta, StoryObj } from "@storybook/react-vite";
import Radio from "./Radio";

const meta = { title: "Atoms/Radio", component: Radio, tags: ["autodocs"], argTypes: { labelPosition: { control: "select", options: ["right", "left"] }, checked: { control: "boolean" }, disabled: { control: "boolean" } } } satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { id: "email-delivery", name: "delivery", label: "Email delivery" } };
export const Group: Story = { render: () => <div style={{ display: "grid", gap: 12 }}><Radio id="daily" name="frequency" label="Daily" checked /><Radio id="weekly" name="frequency" label="Weekly" /><Radio id="never" name="frequency" label="Never" disabled /></div> };
