import type { Meta, StoryObj } from "@storybook/react-vite";
import Banner from "./Banner";

const meta = { title: "Molecules/Banner", component: Banner, tags: ["autodocs"], argTypes: { variant: { control: "select", options: ["default", "with-tiles", "image"] }, title: { control: "text" }, highLightedWord: { control: "text" }, description: { control: "text" }, imageUrl: { control: "text" } } } satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Title: Story = { args: { variant: "default", title: "Discover your next opportunity", highLightedWord: "next", description: "Learn, connect, and contribute with MY Bharat." } };
export const TitleWithTiles: Story = { args: { variant: "with-tiles", title: "Start with an opportunity", tiles: [{ label: "Explore events", url: "/events" }, { label: "Find volunteering", url: "/volunteering" }] } };
export const Image: Story = { args: { imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200", imageAlt: "Young people collaborating at a table" } };
