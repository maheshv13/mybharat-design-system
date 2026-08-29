import type { Meta, StoryObj } from "@storybook/react-vite";
import Container from "./Container";

const meta = { title: "Primitives/Container", component: Container, tags: ["autodocs"], argTypes: { size: { control: "text" } } } satisfies Meta<typeof Container>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: (args) => <Container {...args} style={{ background: "#e8f1ed", padding: 24 }}>{"Content constrained by the container"}</Container> };
