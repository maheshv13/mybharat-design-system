import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Pagination from "./Pagination";

const meta = { title: "Molecules/Pagination", component: Pagination, tags: ["autodocs"], argTypes: { currentPage: { control: "number" }, totalItems: { control: "number" }, rowsPerPage: { control: "number" }, maxVisiblePages: { control: "number" } } } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const MiddlePage: Story = { render: (args) => { const [page, setPage] = useState(args.currentPage ?? 4); return <Pagination {...args} currentPage={page} onPageChange={setPage} />; }, args: { currentPage: 4, totalItems: 120, rowsPerPage: 10, maxVisiblePages: 5 } };
export const FirstPage: Story = { args: { currentPage: 1, totalItems: 30, rowsPerPage: 10, onPageChange: () => {} } };
export const LastPage: Story = { args: { currentPage: 3, totalItems: 30, rowsPerPage: 10, onPageChange: () => {} } };
