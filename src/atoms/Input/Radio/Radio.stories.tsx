
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Radio from "./Radio";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the radio input",
    },
    name: {
      control: "text",
      description: "Name shared by radio buttons in a group",
    },
    label: {
      control: "text",
      description: "Radio button label",
    },
    value: {
      control: "text",
      description: "Value submitted when selected",
    },
    labelPosition: {
      control: "select",
      options: ["right", "left"],
      description: "Position of the label relative to the radio",
    },
    checked: {
      control: "boolean",
      description: "Controls the selected state",
    },
    disabled: {
      control: "boolean",
      description: "Disables the radio button",
    },
    required: {
      control: "boolean",
      description: "Marks the radio button as required",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default radio
export const Default: Story = {
  args: {
    id: "email-delivery",
    name: "delivery",
    value: "email",
    label: "Email delivery",
    checked: false,
    disabled: false,
    required: false,
    labelPosition: "right",
  },
};

// Label on the left
export const LabelLeft: Story = {
  args: {
    id: "left-label",
    name: "label-position",
    value: "left",
    label: "Label on left",
    labelPosition: "left",
  },
};

// Selected radio
export const Selected: Story = {
  args: {
    id: "selected",
    name: "selected-radio",
    value: "selected",
    label: "Selected option",
    checked: true,
  },
};

// Disabled radio
export const Disabled: Story = {
  args: {
    id: "disabled",
    name: "disabled-radio",
    value: "disabled",
    label: "Disabled option",
    disabled: true,
  },
};

// Required radio
export const Required: Story = {
  args: {
    id: "required",
    name: "required-radio",
    value: "required",
    label: "Required option",
    required: true,
  },
};

// Radio group
export const Group: Story = {
  render: () => {
    const [selected, setSelected] = useState("daily");

    const options = [
      { id: "daily", label: "Daily", value: "daily" },
      { id: "weekly", label: "Weekly", value: "weekly" },
      { id: "monthly", label: "Monthly", value: "monthly" },
      { id: "never", label: "Never", value: "never", disabled: true },
    ];

    return (
      <div style={{ display: "grid", gap: 12 }}>
        {options.map((option) => (
          <Radio
            key={option.id}
            id={option.id}
            name="frequency"
            value={option.value}
            label={option.label}
            checked={selected === option.value}
            disabled={option.disabled}
            onChange={() => setSelected(option.value)}
          />
        ))}

        <p>Selected: {selected}</p>
      </div>
    );
  },
};
