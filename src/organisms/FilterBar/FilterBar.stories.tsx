import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import FilterBar from "./FilterBar";

import type {
  FilterField,
  FilterValues,
} from "./FilterBar";


const meta = {
  title: "Organisms/FilterBar",
  component: FilterBar,

  parameters: {
    layout: "padded",
  },

  tags: ["autodocs"],

  argTypes: {
    config: {
      control: false,
    },

    filters: {
      control: false,
    },

    onChange: {
      action: "filters changed",
    },

    onApply: {
      action: "filters applied",
    },

    onClear: {
      action: "filters cleared",
    },

    variant: {
      control: "select",
      options: ["default", "overlay"],
    },

    title: {
      control: "text",
    },

    showActions: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof FilterBar>;

export default meta;

type Story = StoryObj<typeof meta>;


/* =====================================================
   BASIC FILTER CONFIG
===================================================== */

const basicFilters: FilterField[] = [
  {
    name: "eventName",
    label: "Event Name",
    type: "input",
    placeholder: "Search event",
  },

  {
    name: "state",
    label: "State",
    type: "select",
    placeholder: "Select state",
    options: [
      { value: "All", label: "All States" },
      { value: "maharashtra", label: "Maharashtra" },
      { value: "delhi", label: "Delhi" },
      { value: "karnataka", label: "Karnataka" },
    ],
  },

  {
    name: "district",
    label: "District",
    type: "select",
    placeholder: "Select district",
    options: [
      { value: "All", label: "All Districts" },
      { value: "mumbai", label: "Mumbai" },
      { value: "pune", label: "Pune" },
      { value: "nagpur", label: "Nagpur" },
    ],
  },

  {
    name: "specialization",
    label: "Specialization",
    type: "select",
    placeholder: "Select specialization",
    options: [
      { value: "All", label: "All" },
      { value: "technology", label: "Technology" },
      { value: "sports", label: "Sports" },
      { value: "education", label: "Education" },
    ],
  },
];


/* =====================================================
   EXTENDED FILTER CONFIG
===================================================== */

const extendedFilters: FilterField[] = [
  ...basicFilters,

  {
    name: "mboName",
    label: "MBO Name",
    type: "input",
    placeholder: "Enter MBO name",
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    placeholder: "Select status",
    options: [
      { value: "All", label: "All" },
      { value: "ongoing", label: "Ongoing" },
      { value: "upcoming", label: "Upcoming" },
      { value: "completed", label: "Completed" },
    ],
  },
];


/* =====================================================
   DEFAULT FILTER VALUES
===================================================== */

const defaultFilterValues: FilterValues = {
  eventName: "",
  state: "All",
  district: "All",
  specialization: "All",
  mboName: "",
  status: "All",
};


/* =====================================================
   CONTROLLED STORY WRAPPER
===================================================== */

interface FilterBarStoryWrapperProps {
  config: FilterField[];
  initialValues?: FilterValues;
  variant?: string;
  title?: string;
  showActions?: boolean;
}

const FilterBarStoryWrapper = ({
  config,
  initialValues = defaultFilterValues,
  variant = "default",
  title = "Filter By:",
  showActions = true,
}: FilterBarStoryWrapperProps) => {
  const [filters, setFilters] =
    useState<FilterValues>(initialValues);

  const handleChange = (
    updatedFilters: FilterValues
  ) => {
    setFilters(updatedFilters);
  };

  const handleApply = (
    appliedFilters: FilterValues
  ) => {
    console.log(
      "Applied filters:",
      appliedFilters
    );
  };

  const handleClear = () => {
    setFilters(initialValues);

    console.log("Filters cleared");
  };

  return (
    <FilterBar
      config={config}
      filters={filters}
      onChange={handleChange}
      onApply={handleApply}
      onClear={handleClear}
      variant={variant}
      title={title}
      showActions={showActions}
    />
  );
};


/* =====================================================
   STORIES
===================================================== */


/**
 * Basic Filter Bar
 *
 * Shows four filter fields.
 * Show More should not appear.
 */
export const Basic: Story = {
  render: () => (
    <FilterBarStoryWrapper
      config={basicFilters}
      initialValues={{
        eventName: "",
        state: "All",
        district: "All",
        specialization: "All",
      }}
    />
  ),
};


/**
 * More Than Four Filters
 *
 * Show More / Show Less should appear.
 */
export const WithShowMore: Story = {
  render: () => (
    <FilterBarStoryWrapper
      config={extendedFilters}
      initialValues={defaultFilterValues}
    />
  ),
};


/**
 * Filter Bar With Preselected Values
 */
export const WithInitialValues: Story = {
  render: () => (
    <FilterBarStoryWrapper
      config={extendedFilters}
      initialValues={{
        eventName: "Youth Programme",
        state: "maharashtra",
        district: "mumbai",
        specialization: "technology",
        mboName: "",
        status: "ongoing",
      }}
    />
  ),
};


/**
 * Overlay Variant
 */
export const Overlay: Story = {
  render: () => (
    <div
      style={{
        paddingTop: "60px",
        background: "#f5f5f5",
      }}
    >
      <FilterBarStoryWrapper
        config={extendedFilters}
        initialValues={defaultFilterValues}
        variant="overlay"
      />
    </div>
  ),
};


/**
 * Without Action Buttons
 */
export const WithoutActions: Story = {
  render: () => (
    <FilterBarStoryWrapper
      config={basicFilters}
      initialValues={{
        eventName: "",
        state: "All",
        district: "All",
        specialization: "All",
      }}
      showActions={false}
    />
  ),
};