import { useState } from "react";

import type {
  FilterValues,
} from "./FilterBar";

import FilterBar from "./FilterBar";

const initialFilters: FilterValues = {
  eventName: "",
  state: "All",
  district: "All",
  specialization: "All",
};

const stateOptions = [
  {
    value: "All",
    label: "All States",
  },
  {
    value: "Maharashtra",
    label: "Maharashtra",
  },
  {
    value: "Delhi",
    label: "Delhi",
  },
  {
    value: "Karnataka",
    label: "Karnataka",
  },
];

const districtOptions = [
  {
    value: "All",
    label: "All Districts",
  },
  {
    value: "Pune",
    label: "Pune",
  },
  {
    value: "Mumbai",
    label: "Mumbai",
  },
  {
    value: "Nagpur",
    label: "Nagpur",
  },
];

const specializationOptions = [
  {
    value: "All",
    label: "All Specializations",
  },
  {
    value: "Environment",
    label: "Environment",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Sports",
    label: "Sports",
  },
];

export default {
  title: "Organisms/FilterBar",
  component: FilterBar,
};

export const Interactive = () => {
  const [filters, setFilters] =
    useState<FilterValues>(initialFilters);

  const [appliedFilters, setAppliedFilters] =
    useState<FilterValues>(initialFilters);

  const handleApply = (
    nextFilters: FilterValues
  ) => {
    setAppliedFilters(nextFilters);

    console.log(
      "Applied filters:",
      nextFilters
    );
  };

  const handleClear = () => {
    setFilters({
      ...initialFilters,
    });

    setAppliedFilters({
      ...initialFilters,
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <FilterBar
        title="Filter Events"
        config={[
          {
            name: "eventName",
            label: "Event Name",
            type: "input",
            placeholder:
              "Search event",
          },

          {
            name: "state",
            label: "State",
            type: "select",
            options: stateOptions,
          },

          {
            name: "district",
            label: "District",
            type: "select",
            options: districtOptions,

            disabled: (currentFilters) =>
              currentFilters.state ===
              "All",
          },

          {
            name: "specialization",
            label: "Specialization",
            type: "select",
            options:
              specializationOptions,
          },

          {
            name: "eventType",
            label: "Event Type",
            type: "radio",
            options: [
              {
                value: "All",
                label: "All",
              },
              {
                value: "Online",
                label: "Online",
              },
              {
                value: "Offline",
                label: "Offline",
              },
            ],
          },

          {
            name: "categories",
            label: "Categories",
            type: "checkbox",
            options: [
              {
                value: "Youth",
                label: "Youth",
              },
              {
                value: "Volunteer",
                label: "Volunteer",
              },
              {
                value: "Education",
                label: "Education",
              },
            ],
          },
        ]}
        filters={filters}
        onChange={(nextFilters) => {
          setFilters(nextFilters);
        }}
        onApply={handleApply}
        onClear={handleClear}
      />

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
        }}
      >
        <strong>
          Current Filters
        </strong>

        <pre>
          {JSON.stringify(
            filters,
            null,
            2
          )}
        </pre>

        <strong>
          Applied Filters
        </strong>

        <pre>
          {JSON.stringify(
            appliedFilters,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};