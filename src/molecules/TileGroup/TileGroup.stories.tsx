import type { Meta, StoryObj } from "@storybook/react-vite";
import TileGroup from "./TileGroup";

const tiles = ["Events", "Volunteering", "Learning", "Opportunities", "Community"].map((label) => ({ label, url: `/${label.toLowerCase()}` }));
const meta = { title: "Molecules/TileGroup", component: TileGroup, tags: ["autodocs"], argTypes: { tiles: { control: false } } } satisfies Meta<typeof TileGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Carousel: Story = { args: { tiles } };
