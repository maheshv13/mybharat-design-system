import type { Meta, StoryObj } from "@storybook/react-vite";
import UserDropdown from "./UserDropdown";

const meta = { title: "Organisms/UserDropdown", component: UserDropdown, tags: ["autodocs"], argTypes: { user: { control: false }, menuItems: { control: false } } } satisfies Meta<typeof UserDropdown>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Closed: Story = { args: { user: { name: "Aarav Sharma", email: "aarav@example.com", phone: "9876543210" }, menuItems: [{ label: "My profile", icon: "dashboard", onClick: () => {} }, { label: "Sign out", icon: "logout", onClick: () => {} }] } };
