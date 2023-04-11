import React, { useState, FC } from "react";
import { FilterByRangeProps } from "../../../@types/index";

const FilterByRange: FC<FilterByRangeProps> = ({
  setShowFiltersBy,
  setRange,
  min,
  max,
}) => {
  const [values] = useState<{ start: number; end: number }>({
    start: min,
    end: max,
  });
  const [endValue, setEndValue] = useState<number>(values.end);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndValue(Number(e.target.value));
  };

  return (
    <div
      className="overlay"
      onClick={() => {
        setShowFiltersBy((prev) => ({
          ...prev,
          range: false,
        }));
        setRange({ start: 0, end: 0 });
      }}
    >
      <div className="overlayFilters" onClick={(e) => e.stopPropagation()}>
        <input
          type="range"
          min={values?.start}
          max={values?.end}
          onChange={handleRangeChange}
        />
        <div className="overlayFilters-Contents">
          <div>{values.start}</div>
          <div>{endValue}</div>
        </div>
        <div className="overlayFilters-Footer">
          <button
            className="cancelButton"
            onClick={() => {
              setShowFiltersBy((prev) => ({
                ...prev,
                range: false,
              }));
              setRange({ start: 0, end: 0 });
            }}
          >
            Reset
          </button>
          <button
            className="applyButton"
            onClick={() => {
              setShowFiltersBy((prev) => ({
                ...prev,
                range: false,
              }));
              setRange({ ...values, end: endValue });
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterByRange;
