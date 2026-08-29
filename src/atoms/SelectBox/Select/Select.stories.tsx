import type { Meta, StoryObj } from "@storybook/react-vite";
import Select from "./Select";

const options = [{ value: "delhi", label: "New Delhi" }, { value: "mumbai", label: "Mumbai" }, { value: "bengaluru", label: "Bengaluru" }];
const meta = { title: "Atoms/Select", component: Select, tags: ["autodocs"], argTypes: { size: { control: "select", options: ["default", "lg"] }, variant: { control: "select", options: ["default", "filter", "multi"] }, required: { control: "boolean" }, multiple: { control: "boolean" } } } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { id: "city", label: "City", placeholder: "Choose a city", options, description: "Select your preferred city.", required: true } };
export const WithError: Story = { args: { id: "city-error", label: "City", options, value: "", error: "Choose a city before continuing." } };
export const Multiple: Story = { args: { id: "cities", label: "Cities", options, multiple: true, value: ["delhi", "bengaluru"], variant: "multi" } };
