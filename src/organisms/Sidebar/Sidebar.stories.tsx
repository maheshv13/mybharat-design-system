import type { Meta, StoryObj } from "@storybook/react-vite";
import Sidebar from "./Sidebar";

const items = [{ id: "overview", label: "Overview", href: "/overview", icon: "dashboard" as const }, { id: "programmes", label: "Programmes", icon: "event" as const, collapsible: true, children: [{ id: "events", label: "Events", href: "/events", icon: "calendar" as const }, { id: "learning", label: "Learning", href: "/learning", icon: "explore" as const }] }, { id: "settings", label: "Settings", href: "/settings", icon: "settings" as const }];
const meta = { title: "Organisms/Sidebar", component: Sidebar, tags: ["autodocs"], argTypes: { items: { control: false } } } satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const NestedNavigation: Story = { args: { items } };
