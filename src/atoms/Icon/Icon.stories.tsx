import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "./Icon";

const iconNames = ["calendar", "dashboard", "settings", "user", "arrowRight", "checkCircle", "star", "explore"] as const;

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl", "inherit"] },
    color: { control: "text" },
    background: { control: "boolean" },
    rounded: { control: "select", options: ["full", "lg", "default"] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { name: "calendar", size: "lg", color: "primary" } };
export const IconSet: Story = {
  render: () => <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>{iconNames.map((name) => <div key={name} style={{ display: "grid", gap: 6, justifyItems: "center" }}><Icon name={name} size="lg" /><span>{name}</span></div>)}</div>,
};
export const WithBackground: Story = { args: { name: "checkCircle", size: "lg", color: "success", background: true, backgroundColor: "#e6f5ec" } };
