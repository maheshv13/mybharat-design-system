import type { Meta, StoryObj } from "@storybook/react-vite";
import Text from "./Text";

const variants = ["base", "title1", "title2", "title3", "label1", "label2", "label3", "helper", "withBorder", "success", "error", "warning", "h1", "h2", "h3", "h4", "h5", "h6"] as const;
const meta = { title: "Atoms/Text", component: Text, tags: ["autodocs"], argTypes: { variant: { control: "select", options: variants }, color: { control: "select", options: ["primary", "secondary", "success", "warning", "error", "info", "black", "white"] }, as: { control: "text" }, className: { control: "text" } } } satisfies Meta<typeof Text>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { children: "A clear line of supporting text.", variant: "base" } };
export const Variants: Story = { render: () => <div style={{ display: "grid", gap: 12 }}>{variants.map((variant) => <Text key={variant} variant={variant}>{variant} text example</Text>)}</div> };
export const ColoredHeading: Story = { args: { children: "A meaningful page heading", variant: "h2", color: "primary", as: "h2", className: "story-heading" } };
