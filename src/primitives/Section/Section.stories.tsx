import type { Meta, StoryObj } from "@storybook/react-vite";
import Section from "./Section";

const meta = { title: "Primitives/Section", component: Section, tags: ["autodocs"], argTypes: { contained: { control: "boolean" }, spaceY: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"] }, spaceX: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"] }, bg: { control: "text" } } } satisfies Meta<typeof Section>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Padded: Story = { args: { children: <strong>Section content with vertical and horizontal spacing.</strong>, spaceY: "xl", spaceX: "lg", contained: true } };
