import type { Meta, StoryObj } from "@storybook/react-vite";
import TableRow from "./TableRow";

const meta = { title: "Molecules/TableRow", component: TableRow, tags: ["autodocs"], argTypes: { selectable: { control: "boolean" }, serialnumber: { control: "boolean" }, actions: { control: "boolean" }, row: { control: false } } } satisfies Meta<typeof TableRow>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { row: { name: "Community garden", status: "Active", date: "10 Mar 2026" }, index: 0 } };
export const WithActions: Story = { args: { row: { name: "Youth workshop", status: "Pending", date: "18 Mar 2026" }, index: 1, selectable: true, serialnumber: true, actions: true, onEdit: () => {}, onDelete: () => {} } };
