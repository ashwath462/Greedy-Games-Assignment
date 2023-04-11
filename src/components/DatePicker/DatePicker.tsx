import React, { FC, FormEvent } from "react";
import { DataPickerProps } from "../../@types/index";

const DataPicker: FC<DataPickerProps> = ({
  handleAPIQuery,
  date,
  setStartDate,
  setEndDate,
  setShowDatePicker,
}) => {
  return (
    <form className="datePickerContainer" onSubmit={handleAPIQuery}>
      <div>
        <div className="datePickerContainer-label">
          <label htmlFor="startDate">Start Date</label>
        </div>
        <input
          type="date"
          name="startDate"
          min="2021-06-01"
          value={date?.start}
          onChange={(e: any) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <div className="datePickerContainer-label">
          <label htmlFor="endDate">End Date</label>
        </div>
        <input
          type="date"
          name="endDate"
          min="2021-06-31"
          value={date?.end}
          onChange={(e: any) => setEndDate(e.target.value)}
        />
      </div>
      <div className="datePickerContainer-footer">
        <button
          className="cancelButton"
          onClick={() => setShowDatePicker(false)}
        >
          Cancel
        </button>
        <button className="applyButton">Search</button>
      </div>
    </form>
  );
};

export default DataPicker;
