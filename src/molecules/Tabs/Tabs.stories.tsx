import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import Tabs from "./Tabs";

const items = [
  {
    key: "overview",
    label: "Overview",
    content: "A quick view of your activity.",
  },
  {
    key: "events",
    label: "Events",
    content: "Browse upcoming events and programmes.",
    icon: "event" as const,
    count: 4,
  },
  {
    key: "learning",
    label: "Learning",
    content: "Continue building practical skills.",
  },
];

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "vertical"],
    },

    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },

    defaultActiveIndex: {
      control: "number",
    },

    items: {
      control: false,
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => {
    const [activeKey, setActiveKey] =
      useState<string | number>("overview");

    return (
      <Tabs
        items={items}
        activeKey={activeKey}
        onChange={setActiveKey}
      />
    );
  },
};

export const Filled: Story = {
  args: {
    items,
    variant: "filled",
    defaultActiveIndex: 1,
  },
};

export const Vertical: Story = {
  args: {
    items,
    variant: "vertical",
    orientation: "vertical",
  },
};