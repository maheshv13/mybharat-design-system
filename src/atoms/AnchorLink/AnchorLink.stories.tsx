import type { Meta, StoryObj } from "@storybook/react-vite";

import AnchorLink from "./AnchorLink";

const meta = {
  title: "Atoms/AnchorLink",
  component: AnchorLink,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: ["default", "button"],
    },

    href: {
      control: "text",
    },

    to: {
      control: "text",
    },

    target: {
      control: "text",
    },

    rel: {
      control: "text",
    },

    children: {
      control: "text",
    },
  },

  args: {
    children: "MY Bharat",
    href: "#",
    variant: "default",
  },
} satisfies Meta<typeof AnchorLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Learn More",
    href: "#",
    variant: "default",
  },
};

export const Button: Story = {
  args: {
    children: "Register Now",
    href: "#",
    variant: "button",
  },
};

export const InternalLink: Story = {
  args: {
    children: "Go to Dashboard",
    href: "/dashboard",
    variant: "default",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "Visit Website",
    href: "https://example.com",
    variant: "default",
  },
};