import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";

const meta = { title: "Molecules/Card", component: Card, tags: ["autodocs"], argTypes: { variant: { control: "text" }, title: { control: "text" }, href: { control: "text" }, image: { control: "text" } } } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Opportunity: Story = { args: { title: "Community leadership programme", description: "Build practical skills while contributing to your community.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800", startDate: "10 Mar 2026", endDate: "24 Mar 2026", district: "New Delhi", state: "Delhi", hours: "20", applicants: "128", Opportunities: "Volunteering", href: "/opportunities", cta: "View opportunity" } };
