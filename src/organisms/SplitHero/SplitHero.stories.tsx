import type { Meta, StoryObj } from "@storybook/react-vite";
import SplitHero from "./SplitHero";

const meta = { title: "Organisms/SplitHero", component: SplitHero, tags: ["autodocs"], argTypes: { mediaPosition: { control: "select", options: ["left", "right"] }, media: { control: false }, children: { control: false } } } satisfies Meta<typeof SplitHero>;
export default meta;
type Story = StoryObj<typeof meta>;
export const MediaLeft: Story = { args: { mediaPosition: "left", media: <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900" alt="People collaborating at a table" style={{ width: "100%" }} />, children: <><h1>Turn ideas into action</h1><p>Find opportunities to learn, connect, and contribute.</p><a href="/opportunities">Explore opportunities</a></> } };
export const MediaRight: Story = { args: { mediaPosition: "right", media: <div style={{ padding: 48, background: "#d9eee7" }}>Media area</div>, children: <><h2>Content beside media</h2><p>A flexible split layout for focused introductions.</p></> } };
