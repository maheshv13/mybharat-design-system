import type { Meta, StoryObj } from "@storybook/react-vite";
import Branding from "./Branding";

const meta = { title: "Molecules/Branding", component: Branding, tags: ["autodocs"], argTypes: { hasEmblem: { control: "boolean" }, hasSeperator: { control: "boolean" }, direction: { control: "select", options: ["horizontal", "vertical"] } } } satisfies Meta<typeof Branding>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Horizontal: Story = { args: { hasEmblem: true, hasSeperator: true, direction: "horizontal" } };
export const Vertical: Story = { args: { hasEmblem: true, direction: "vertical" } };
