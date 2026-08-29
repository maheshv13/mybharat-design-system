import type { Meta, StoryObj } from "@storybook/react-vite";
import Switcher from "./Switcher";

const meta = { title: "Primitives/Switcher", component: Switcher, tags: ["autodocs"], argTypes: { gap: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] }, minWidth: { control: "select", options: ["sm", "md", "lg"] } } } satisfies Meta<typeof Switcher>;
export default meta;
type Story = StoryObj<typeof meta>;
export const FlexibleColumns: Story = { args: { gap: "md", minWidth: "sm" }, render: (args) => <Switcher {...args}>{["A flexible panel", "Another flexible panel", "A third panel"].map((item) => <div key={item} style={{ padding: 24, background: "#e8f1ed" }}>{item}</div>)}</Switcher> };
