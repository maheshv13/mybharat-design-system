import type { Meta, StoryObj } from "@storybook/react-vite";
import TableHeaderRow from "./TableHeaderRow";

const columns = [{ key: "name", label: "Name" }, { key: "status", label: "Status" }, { key: "date", label: "Date" }];
const meta = { title: "Molecules/TableHeaderRow", component: TableHeaderRow, tags: ["autodocs"], argTypes: { selectable: { control: "boolean" }, serialnumber: { control: "boolean" }, actions: { control: "boolean" }, columns: { control: false } } } satisfies Meta<typeof TableHeaderRow>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { columns } };
export const WithSelectionAndActions: Story = { args: { columns, selectable: true, serialnumber: true, actions: true } };
