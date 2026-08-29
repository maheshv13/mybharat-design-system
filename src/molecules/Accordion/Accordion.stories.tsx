import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion from "./Accordion";

const items = [{ title: "What is MY Bharat?", content: "A platform that connects young people with opportunities." }, { title: "Who can participate?", content: "Young people can explore activities, learning, and volunteering." }, { title: "How do I get started?", content: "Choose an opportunity and follow its registration steps." }];
const meta = { title: "Molecules/Accordion", component: Accordion, tags: ["autodocs"], argTypes: { allowMultiple: { control: "boolean" }, items: { control: false } } } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { items, openIndexes: [0] } };
export const MultipleOpen: Story = { render: () => { const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]); return <Accordion items={items} allowMultiple openIndexes={openIndexes} onChange={setOpenIndexes} />; } };
