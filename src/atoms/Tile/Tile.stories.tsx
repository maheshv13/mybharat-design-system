import type { Meta, StoryObj } from "@storybook/react-vite";
import Tile from "./Tile";
import { MdArrowForward, MdEvent } from "react-icons/md";

const meta = { title: "Atoms/Tile", component: Tile, tags: ["autodocs"], argTypes: { variant: { control: "select", options: ["default", "bordered", "inverse"] }, iconPosition: { control: "select", options: ["left", "right"] }, active: { control: "boolean" }, url: { control: "text" } } } satisfies Meta<typeof Tile>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { label: "Explore opportunities", url: "/opportunities", icon: <MdArrowForward /> } };
export const ActiveBordered: Story = { args: { label: "Upcoming events", url: "/events", icon: <MdEvent />, variant: "bordered", active: true, iconPosition: "right" } };
