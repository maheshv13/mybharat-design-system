import type { Meta, StoryObj } from "@storybook/react-vite";
import Grid from "./Grid";

const meta = { title: "Primitives/Grid", component: Grid, tags: ["autodocs"], argTypes: { cols: { control: "text" }, gap: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] } } } satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ResponsiveColumns: Story = { args: { cols: "1 2 3", gap: "md" }, render: (args) => <Grid {...args}>{["One", "Two", "Three", "Four", "Five", "Six"].map((item) => <div key={item} style={{ padding: 24, background: "#e8f1ed" }}>{item}</div>)}</Grid> };
