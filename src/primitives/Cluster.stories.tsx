import type { Meta, StoryObj } from "@storybook/react-vite";
import Cluster from "./Cluster";

const meta = { title: "Primitives/Cluster", component: Cluster, tags: ["autodocs"], argTypes: { gap: { control: "select", options: ["sm", "md", "lg", "xl"] }, align: { control: "select", options: ["start", "center", "end"] }, justify: { control: "select", options: ["start", "center", "end", "between", "around", "evenly"] }, wrap: { control: "boolean" } } } satisfies Meta<typeof Cluster>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WrappingActions: Story = { args: { gap: "md", align: "center", justify: "start", wrap: true }, render: (args) => <Cluster {...args}>{["Overview", "Applications", "Resources", "Contact"].map((item) => <button key={item} type="button">{item}</button>)}</Cluster> };
