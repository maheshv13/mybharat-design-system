import type { Meta, StoryObj } from "@storybook/react-vite";
import SocialLinks from "./SocialLinks";

const meta = { title: "Molecules/SocialLinks", component: SocialLinks, tags: ["autodocs"], argTypes: { SocialLinksHeading: { control: "text" } } } satisfies Meta<typeof SocialLinks>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithHeading: Story = { args: { SocialLinksHeading: "Follow MY Bharat" } };
export const WithoutHeading: Story = {};
