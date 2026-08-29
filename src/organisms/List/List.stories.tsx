import type { Meta, StoryObj } from "@storybook/react-vite";
import List from "./List";

const items = [{ id: 1, title: "Community events", description: "Meet people and take part locally.", iconName: "event" as const, href: "/events" }, { id: 2, title: "Learning programmes", description: "Build skills for your next step.", iconName: "explore" as const, href: "/learning" }, { id: 3, title: "Volunteer opportunities", description: "Make a difference with your time.", iconName: "users" as const, href: "/volunteering" }];
const meta = { title: "Organisms/List", component: List, tags: ["autodocs"], argTypes: { variant: { control: "text" }, columns: { control: "text" }, gap: { control: "text" }, iconPosition: { control: "select", options: ["left", "right", "top", "center"] }, items: { control: false } } } satisfies Meta<typeof List>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Vertical: Story = { args: { items, variant: "vertical", gap: "md" } };
export const WithCustomChildren: Story = { render: () => <List as="div" variant="horizontal" columns={3}><List.Item title="A custom item" description="List.Item can be composed directly." iconName="star" /></List> };
