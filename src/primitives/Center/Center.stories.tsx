import type { Meta, StoryObj } from "@storybook/react-vite";
import Center from "./Center";

const meta = { title: "Primitives/Center", component: Center, tags: ["autodocs"], argTypes: { inline: { control: "boolean" }, full: { control: "boolean" }, textAlign: { control: "select", options: ["left", "center", "right"] } } } satisfies Meta<typeof Center>;
export default meta;
type Story = StoryObj<typeof meta>;
export const CenteredContent: Story = { args: { children: <div style={{ padding: 32, background: "#e8f1ed" }}>Centered content</div>, full: true } };
