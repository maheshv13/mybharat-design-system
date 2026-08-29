import type { Meta, StoryObj } from "@storybook/react-vite";
import Footer from "./Footer";

const meta = { title: "Organisms/Footer", component: Footer, tags: ["autodocs"], argTypes: { importantLinks: { control: false }, usefulLinks: { control: false } } } satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { importantLinks: [{ label: "About us", href: "/about" }, { label: "Contact", href: "/contact" }], usefulLinks: [{ label: "Help centre", href: "/help" }, { label: "Accessibility", href: "/accessibility" }] } };
