import type { Meta, StoryObj } from "@storybook/react-vite";
import FontSizeControls from "./FontSizeControls";

const meta = { title: "Molecules/FontSizeControls", component: FontSizeControls, tags: ["autodocs"], parameters: { viewport: { defaultViewport: "responsive" } } } satisfies Meta<typeof FontSizeControls>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
