import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Modal from "./Modal";

const meta = { title: "Molecules/Modal", component: Modal, tags: ["autodocs"], argTypes: { size: { control: "select", options: ["sm", "md", "lg"] }, closeOnOverlay: { control: "boolean" }, closeOnEscape: { control: "boolean" }, showCloseButton: { control: "boolean" }, withLogo: { control: "boolean" } } } satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Open: Story = { render: (args) => { const [isOpen, setIsOpen] = useState(true); return <><button type="button" onClick={() => setIsOpen(true)}>Open dialog</button><Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm your choice"><p>Review the information before continuing.</p><button type="button" onClick={() => setIsOpen(false)}>Continue</button></Modal></>; }, args: { size: "md" } };
export const Closed: Story = { args: { isOpen: false, title: "Hidden dialog" } };
