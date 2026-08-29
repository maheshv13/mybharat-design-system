import type { Meta, StoryObj } from "@storybook/react-vite";
import LinkList from "./LinkList";

const links = [{ label: "About MY Bharat", href: "/about" }, { label: "Opportunities", href: "/opportunities" }, { label: "Contact support", type: "button" as const, onClick: () => {} }];
const meta = { title: "Molecules/LinkList", component: LinkList, tags: ["autodocs"], argTypes: { variant: { control: "select", options: ["default", "dark"] }, title: { control: "text" } } } satisfies Meta<typeof LinkList>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { title: "Explore", links } };
export const Dark: Story = { args: { title: "Resources", links: links.slice(0, 2), variant: "dark" } };
