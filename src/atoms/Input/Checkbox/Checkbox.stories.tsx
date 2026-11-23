
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Checkbox from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the checkbox",
    },
    name: {
      control: "text",
      description: "Name of the checkbox input",
    },
    label: {
      control: "text",
      description: "Checkbox label",
    },
    labelPosition: {
      control: "select",
      options: ["right", "left"],
      description: "Position of the label relative to the checkbox",
    },
    checked: {
      control: "boolean",
      description: "Controls the checked state",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox",
    },
    required: {
      control: "boolean",
      description: "Marks the checkbox as required",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default checkbox
export const Default: Story = {
  args: {
    id: "updates",
    name: "updates",
    label: "Send me updates",
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
    name: "left-label",
    label: "Label on left",
    labelPosition: "left",
  },
};

// Checked checkbox
export const Checked: Story = {
  args: {
    id: "checked",
    name: "checked",
    label: "Selected option",
    checked: true,
  },
};

// Disabled checkbox
export const Disabled: Story = {
  args: {
    id: "disabled",
    name: "disabled",
    label: "Disabled option",
    disabled: true,
  },
};

// Required checkbox
export const Required: Story = {
  args: {
    id: "required",
    name: "required",
    label: "Required option",
    required: true,
  },
};

// Checkbox states
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Checkbox
        id="normal"
        name="normal"
        label="Default option"
      />

      <Checkbox
        id="selected"
        name="selected"
        label="Selected option"
        checked
      />

      <Checkbox
        id="required"
        name="required"
        label="Required option"
        required
      />

      <Checkbox
        id="disabled"
        name="disabled"
        label="Disabled option"
        disabled
      />

      <Checkbox
        id="disabled-checked"
        name="disabled-checked"
        label="Disabled and selected"
        checked
        disabled
      />
    </div>
  ),
};

// Interactive checkbox
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: "grid", gap: 12 }}>
        <Checkbox
          id="interactive"
          name="interactive"
          label="Subscribe to updates"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />

        <p>Checked: {checked ? "Yes" : "No"}</p>
      </div>
    );
  },
};
