import type { Meta, StoryObj } from "@storybook/react-vite";
import TableCell from "./TableCell";

const meta = { title: "Atoms/TableCell", component: TableCell, tags: ["autodocs"], argTypes: { as: { control: "select", options: ["td", "th"] }, align: { control: "select", options: ["left", "center", "right"] } } } satisfies Meta<typeof TableCell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <table><tbody><tr><TableCell>Opportunity</TableCell><TableCell align="right">Open</TableCell></tr></tbody></table> };
export const Header: Story = { render: () => <table><thead><tr><TableCell as="th" align="left">Name</TableCell><TableCell as="th" align="center">Status</TableCell></tr></thead><tbody><tr><TableCell>Community garden</TableCell><TableCell align="center">Active</TableCell></tr></tbody></table> };
