import type { Meta, StoryObj } from "@storybook/react-vite";
import Header from "./Header";
import type { NavigationLink } from "../../molecules/NavigationLinks/navLinkUtils";

const navLinks: NavigationLink[] = [{ label: "Home", href: "/" }, { label: "Explore", children: [{ label: "Events", href: "/events" }, { label: "Learning", href: "/learning" }] }, { label: "About", href: "/about" }];
const meta = { title: "Organisms/Header", component: Header, tags: ["autodocs"], argTypes: { variant: { control: "select", options: ["default", "compact", "auth"] }, withTopabar: { control: "boolean" }, contained: { control: "boolean" }, isAuthenticated: { control: "boolean" }, navLinks: { control: false } } } satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { navLinks, withTopabar: true, contained: true, isAuthenticated: false } };
export const Authenticated: Story = { args: { navLinks, isAuthenticated: true, withTopabar: false } };
export const AuthVariant: Story = { args: { variant: "auth", withTopabar: false } };
