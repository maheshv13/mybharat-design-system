import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import MultiSelect from "./MultiSelect";

const interestOptions = [
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "music",
    label: "Music",
  },
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "travel",
    label: "Travel",
  },
  {
    value: "photography",
    label: "Photography",
  },
  {
    value: "reading",
    label: "Reading",
  },
  {
    value: "gaming",
    label: "Gaming",
  },
];

const meta = {
  title: "Atoms/MultiSelect",

  component: MultiSelect,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          maxWidth: "100%",
        }}
      >
        <Story />
      </div>
    ),
  ],

  argTypes: {
    error: {
      control: "boolean",
    },

    required: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    options: {
      control: false,
    },

    value: {
      control: false,
    },

    defaultValue: {
      control: false,
    },

    onChange: {
      action: "changed",
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

/* =========================================================
   DEFAULT
========================================================= */

export const Default: Story = {
  args: {
    id: "interests",
    label: "Interests",
    placeholder: "Select interests",
    options: interestOptions,
  },
};

/* =========================================================
   WITH DESCRIPTION
========================================================= */

export const WithDescription: Story = {
  args: {
    id: "skills",
    label: "Skills",
    placeholder: "Select skills",
    description:
      "You can select multiple options.",
    options: interestOptions,
  },
};

/* =========================================================
   REQUIRED
========================================================= */

export const Required: Story = {
  args: {
    id: "required-interests",
    label: "Select Interests",
    placeholder: "Choose options",
    required: true,
    options: interestOptions,
  },
};

/* =========================================================
   DEFAULT SELECTED VALUES
========================================================= */

export const DefaultSelectedValues: Story = {
  args: {
    id: "selected-interests",
    label: "Selected Interests",
    options: interestOptions,
    defaultValue: [
      "sports",
      "music",
    ],
  },
};

/* =========================================================
   MANY SELECTED OPTIONS
   Tests the +N behavior
========================================================= */

export const ManySelectedOptions: Story = {
  args: {
    id: "many-interests",
    label: "Interests",
    placeholder: "Select interests",
    options: interestOptions,
    defaultValue: [
      "sports",
      "music",
      "technology",
      "travel",
      "photography",
      "reading",
    ],
  },
};

/* =========================================================
   CONTROLLED
========================================================= */

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([
      "sports",
      "music",
    ]);

    return (
      <MultiSelect
        id="controlled-interests"
        label="Controlled Multi Select"
        placeholder="Select interests"
        options={interestOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/* =========================================================
   ERROR
========================================================= */

export const Error: Story = {
  args: {
    id: "error-select",
    label: "Interests",
    placeholder: "Select interests",
    description:
      "Please select at least one option.",
    required: true,
    error: true,
    options: interestOptions,
  },
};

/* =========================================================
   DISABLED
========================================================= */

export const Disabled: Story = {
  args: {
    id: "disabled-select",
    label: "Interests",
    placeholder: "Select interests",
    options: interestOptions,
    defaultValue: [
      "sports",
      "music",
    ],
    disabled: true,
  },
};

/* =========================================================
   DISABLED OPTION
========================================================= */

export const WithDisabledOption: Story = {
  args: {
    id: "disabled-option",
    label: "Interests",
    placeholder: "Select interests",
    options: [
      {
        value: "sports",
        label: "Sports",
      },
      {
        value: "music",
        label: "Music",
      },
      {
        value: "technology",
        label: "Technology",
        disabled: true,
      },
      {
        value: "travel",
        label: "Travel",
      },
    ],
  },
};