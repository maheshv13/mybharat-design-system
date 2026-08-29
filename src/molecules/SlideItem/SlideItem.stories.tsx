import type { Meta, StoryObj } from "@storybook/react-vite";
import SlideItem from "./SlideItem";

const image = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000";
const meta = { title: "Molecules/SlideItem", component: SlideItem, tags: ["autodocs"], argTypes: { image: { control: "text" }, link: { control: "text" }, heading: { control: "text" }, description: { control: "text" } } } satisfies Meta<typeof SlideItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WithContent: Story = { args: { image, alt: "Friends outdoors", heading: "Find your community", description: "Connect with people and opportunities that matter.", link: "/community" } };
export const ImageOnly: Story = { args: { image, alt: "Friends outdoors" } };
