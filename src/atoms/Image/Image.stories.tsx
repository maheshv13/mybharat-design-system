import type { Meta, StoryObj } from "@storybook/react-vite";
import Image from "./Image";

const imageSource = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23d9eee7'/%3E%3Ccircle cx='150' cy='120' r='62' fill='%23f4b942'/%3E%3Cpath d='M0 300 180 170 300 260 430 130 640 300V360H0Z' fill='%232d6a4f'/%3E%3C/svg%3E";

const meta = { title: "Atoms/Image", component: Image, tags: ["autodocs"], argTypes: { variant: { control: "select", options: ["overlay", "inline", "hover"] }, size: { control: "select", options: ["", "xs", "sm", "md"] } } } satisfies Meta<typeof Image>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { src: imageSource, alt: "Illustrated green hills under a golden sun", size: "md" } };
export const WithLocation: Story = { args: { src: imageSource, alt: "Illustrated green hills under a golden sun", variant: "overlay", geo: { lat: 28.6139, lng: 77.209, label: "New Delhi" } } };
