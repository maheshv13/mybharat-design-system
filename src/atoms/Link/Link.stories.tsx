import type { Meta, StoryObj } from "@storybook/react-vite";
import Link from "./Link";

const meta = { title: "Atoms/Link", component: Link, tags: ["autodocs"], argTypes: { href: { control: "text" }, target: { control: "select", options: ["_self", "_blank"] }, variant: { control: "select", options: ["default", "dark"] } } } satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { children: "Read more", href: "/details" } };
export const External: Story = { args: { children: "Visit mybharat.gov.in", href: "https://mybharat.gov.in", target: "_blank", rel: "noopener noreferrer" } };
export const Action: Story = { args: { children: "Open details", onClick: () => {}, variant: "dark" } };
