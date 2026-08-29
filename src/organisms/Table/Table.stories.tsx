import type { Meta, StoryObj } from "@storybook/react-vite";
import Table from "./Table";

const columns = [{ key: "name", label: "Opportunity" }, { key: "status", label: "Status" }, { key: "location", label: "Location" }];
const data = [{ name: "Community garden", status: "Open", location: "New Delhi" }, { name: "Youth workshop", status: "Upcoming", location: "Mumbai" }, { name: "River clean-up", status: "Open", location: "Bengaluru" }, { name: "Digital skills lab", status: "Full", location: "Pune" }, { name: "Local history project", status: "Open", location: "Jaipur" }, { name: "Sports programme", status: "Upcoming", location: "Kochi" }];
const meta = { title: "Organisms/Table", component: Table, tags: ["autodocs"], argTypes: { selectable: { control: "boolean" }, actions: { control: "boolean" }, serialnumber: { control: "boolean" }, pagination: { control: "boolean" }, rowsPerPage: { control: "number" }, columns: { control: false }, data: { control: false } } } satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Paginated: Story = { args: { columns, data, pagination: true, rowsPerPage: 5, serialnumber: true } };
export const SelectableWithActions: Story = { args: { columns, data: data.slice(0, 3), selectable: true, actions: true, serialnumber: true } };
