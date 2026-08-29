import type { Meta, StoryObj } from "@storybook/react-vite";
import Slider from "./Slider";

const slides = [{ image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000", alt: "Friends outdoors", heading: "Find your community", description: "Connect through shared interests.", link: "/community" }, { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000", alt: "Team collaborating", heading: "Build practical skills", description: "Explore learning opportunities.", link: "/learning" }, { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000", alt: "People collaborating", heading: "Make an impact", description: "Discover ways to contribute.", link: "/volunteering" }];
const meta = { title: "Organisms/Slider", component: Slider, tags: ["autodocs"], argTypes: { autoPlay: { control: "boolean" }, interval: { control: "number" }, slides: { control: false } } } satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ManualNavigation: Story = { args: { slides, autoPlay: false } };
export const AutoPlay: Story = { args: { slides, autoPlay: true, interval: 5000 } };
