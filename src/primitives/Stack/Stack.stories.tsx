import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "./Stack";

const meta = { title: "Primitives/Stack", component: Stack, tags: ["autodocs"], argTypes: { gap: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl", "xxxxl"] }, mobileGap: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] } } } satisfies Meta<typeof Stack>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Vertical: Story = { render: (args) => <Stack {...args}>{["First item", "Second item", "Third item"].map((item) => <div key={item} style={{ padding: 16, background: "#e8f1ed" }}>{item}</div>)}</Stack>, args: { gap: "lg", mobileGap: "sm" } };
