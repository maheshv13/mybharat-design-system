import type { Meta, StoryObj } from "@storybook/react-vite";
import NavigationLinks from "./NavigationLinks";
import type { NavigationLink } from "./navLinkUtils";

const links: NavigationLink[] = [{ label: "Home", href: "/", }, { label: "Opportunities", children: [{ label: "Events", href: "/events" }, { label: "Learning", children: [{ label: "Courses", href: "/courses" }] }] }, { label: "About", href: "/about" }];
const meta = { title: "Molecules/NavigationLinks", component: NavigationLinks, tags: ["autodocs"], argTypes: { currentPath: { control: "text" }, links: { control: false } } } satisfies Meta<typeof NavigationLinks>;
export default meta;
type Story = StoryObj<typeof meta>;
export const NestedNavigation: Story = { args: { links, currentPath: "/events" } };
