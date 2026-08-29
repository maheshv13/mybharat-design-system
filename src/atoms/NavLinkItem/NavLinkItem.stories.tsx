import type { Meta, StoryObj } from "@storybook/react-vite";
import NavLinkItem from "./NavLinkItem";

const meta = { title: "Atoms/NavLinkItem", component: NavLinkItem, tags: ["autodocs"], argTypes: { href: { control: "text" }, to: { control: "text" }, isActive: { control: "boolean" }, currentPath: { control: "text" } } } satisfies Meta<typeof NavLinkItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { href: "/opportunities", label: "Opportunities" } };
export const Active: Story = { args: { href: "/opportunities", label: "Opportunities", isActive: true } };
