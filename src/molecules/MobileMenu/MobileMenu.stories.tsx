import type { Meta, StoryObj } from "@storybook/react-vite";
import MobileMenu from "./MobileMenu";
import type { NavigationLink } from "../NavigationLinks/navLinkUtils";

const links: NavigationLink[] = [{ label: "Home", href: "/" }, { label: "Opportunities", children: [{ label: "Events", href: "/events" }, { label: "Learning", children: [{ label: "Courses", href: "/courses" }] }] }];
const meta = { title: "Molecules/MobileMenu", component: MobileMenu, tags: ["autodocs"], parameters: { viewport: { defaultViewport: "mobile1" } }, argTypes: { isAuthenticated: { control: "boolean" }, links: { control: false } } } satisfies Meta<typeof MobileMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Navigation: Story = { args: { links, isAuthenticated: false } };
export const Authenticated: Story = { args: { links, isAuthenticated: true } };
