import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Button",
  component: Button,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "primary-outlined",
        "tonal",
        "success",
        "success-outlined",
        "danger",
        "danger-outlined",
        "blue",
        "blue-outlined",
      ],
    },

    size: {
      control: "select",
      options: [
        "xxs",
        "xs",
        "sm",
        "default",
        "lg",
      ],
    },

    disabled: {
      control: "boolean",
    },

    icon: {
      control: "select",
      options: [
        "arrow",
        "arrowRight",
        "arrowLeft",
        "calendar",
        "event",
        "dashboard",
        "settings",
        "location",
      ],
    },

    iconPosition: {
      control: "select",
      options: [
        "left",
        "right",
      ],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "default",
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Continue",
    icon: "arrow",
    iconPosition: "left",
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Continue",
    icon: "arrowRight",
    iconPosition: "right",
  },
};

export const VariantGallery: Story = {
  render: () => {
    const variants = [
      "primary",
      "primary-outlined",
      "tonal",
      "success",
      "success-outlined",
      "danger",
      "danger-outlined",
      "blue",
      "blue-outlined",
    ] as const;

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          alignItems: "center",
        }}
      >
        {variants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            label={variant
              .split("-")
              .map((part) =>
                part.charAt(0).toUpperCase() + part.slice(1),
              )
              .join(" ")}
          />
        ))}
      </div>
    );
  },
};

export const SizeGallery: Story = {
  render: () => {
    const sizes = ["xxs", "xs", "sm", "default", "lg"] as const;

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {sizes.map((size) => (
          <Button
            key={size}
            size={size}
            variant="primary"
            label={size.toUpperCase()}
          />
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    variant: "danger-outlined",
    disabled: true,
  },
};