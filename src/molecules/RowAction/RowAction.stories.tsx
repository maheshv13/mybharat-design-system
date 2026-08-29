import type { Meta, StoryObj } from "@storybook/react-vite";
import RowAction from "./RowAction";

const meta = { title: "Molecules/RowAction", component: RowAction, tags: ["autodocs"], argTypes: { onEdit: { action: "edit" }, onDelete: { action: "delete" } } } satisfies Meta<typeof RowAction>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { onEdit: () => {}, onDelete: () => {} } };
