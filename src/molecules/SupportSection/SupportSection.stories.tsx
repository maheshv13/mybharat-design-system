import type { Meta, StoryObj } from "@storybook/react-vite";
import SupportSection from "./SupportSection";

const meta = { title: "Molecules/SupportSection", component: SupportSection, tags: ["autodocs"] } satisfies Meta<typeof SupportSection>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
