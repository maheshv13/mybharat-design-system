import type { Meta, StoryObj } from "@storybook/react-vite";
import ListItem from "./ListItem";

const meta = { title: "Molecules/ListItem", component: ListItem, tags: ["autodocs"], argTypes: { iconName: { control: "select", options: ["calendar", "users", "explore"] }, iconPosition: { control: "select", options: ["left", "right", "top", "center"] }, showIcon: { control: "boolean" }, href: { control: "text" } } } satisfies Meta<typeof ListItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithIcon: Story = { args: { title: "Volunteer locally", description: "Find meaningful ways to contribute in your community.", iconName: "users", href: "/volunteering" } };
export const Centered: Story = { args: { title: "Upcoming events", description: "Browse events near you.", iconName: "calendar", iconPosition: "center", iconBackground: "#e6f5ec" } };
