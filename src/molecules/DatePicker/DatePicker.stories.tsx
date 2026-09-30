import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import DatePicker from "./DatePicker";

const meta = {
  title: "Molecules/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Selected date in YYYY-MM-DD format",
    },
    min: {
      control: "text",
      description: "Minimum selectable date in YYYY-MM-DD format",
    },
    max: {
      control: "text",
      description: "Maximum selectable date in YYYY-MM-DD format",
    },
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    onChange: {
      action: "date changed",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------
   Default
------------------------------------------------- */

export const Default: Story = {
  args: {
    id: "date-picker",
    label: "Select Date",
    placeholder: "Select date",
  },
};

/* -------------------------------------------------
   With Selected Date
------------------------------------------------- */

export const WithSelectedDate: Story = {
  args: {
    id: "selected-date",
    label: "Date",
    value: "2026-09-28",
  },
};

/* -------------------------------------------------
   Required
------------------------------------------------- */

export const Required: Story = {
  args: {
    id: "required-date",
    label: "Date of Birth",
    placeholder: "Select date",
    required: true,
  },
};

/* -------------------------------------------------
   Disabled
------------------------------------------------- */

export const Disabled: Story = {
  args: {
    id: "disabled-date",
    label: "Date",
    value: "2026-09-28",
    disabled: true,
  },
};

/* -------------------------------------------------
   Min / Max
------------------------------------------------- */

export const WithMinMax: Story = {
  args: {
    id: "range-date",
    label: "Event Date",
    placeholder: "Select event date",
    min: "2026-09-20",
    max: "2026-10-10",
  },
};

/* -------------------------------------------------
   Min Date Only
------------------------------------------------- */

export const WithMinDate: Story = {
  args: {
    id: "min-date",
    label: "Start Date",
    placeholder: "Select start date",
    min: "2026-09-20",
  },
};

/* -------------------------------------------------
   Max Date Only
------------------------------------------------- */

export const WithMaxDate: Story = {
  args: {
    id: "max-date",
    label: "End Date",
    placeholder: "Select end date",
    max: "2026-10-10",
  },
};

/* -------------------------------------------------
   Controlled
------------------------------------------------- */

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState("");

    return (
      <div style={{ width: "320px" }}>
        <DatePicker
          id="controlled-date"
          label="Controlled Date"
          value={date}
          placeholder="Select date"
          onChange={setDate}
        />

        <div
          style={{
            marginTop: "16px",
            fontSize: "14px",
          }}
        >
          Selected value:{" "}
          <strong>
            {date || "No date selected"}
          </strong>
        </div>
      </div>
    );
  },
};

/* -------------------------------------------------
   Uncontrolled
------------------------------------------------- */

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <DatePicker
        id="uncontrolled-date"
        label="Uncontrolled Date"
        placeholder="Select date"
        onChange={(date) => {
          console.log("Selected date:", date);
        }}
      />
    </div>
  ),
};

/* -------------------------------------------------
   Event Date Example
------------------------------------------------- */

export const EventDate: Story = {
  render: () => (
    <div style={{ width: "320px" }}>
      <DatePicker
        id="event-date"
        label="Event Date"
        placeholder="Select event date"
        min="2026-09-20"
        max="2026-10-10"
        required
        onChange={(date) => {
          console.log("Event date:", date);
        }}
      />
    </div>
  ),
};