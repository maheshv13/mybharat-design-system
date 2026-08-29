import type { Meta, StoryObj } from "@storybook/react-vite";
import SidebarLayout from "./SidebarLayout";

const meta = { title: "Primitives/SidebarLayout", component: SidebarLayout, tags: ["autodocs"] } satisfies Meta<typeof SidebarLayout>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SidebarAndMain: Story = { render: () => <SidebarLayout sidebar={<nav aria-label="Section navigation" style={{ padding: 24, display: "grid", gap: 12 }}><a href="/overview">Overview</a><a href="/settings">Settings</a></nav>}><article><h2>Content area</h2><p>The main content sits beside the sidebar and follows the primitive's responsive layout.</p></article></SidebarLayout> };
