import React, { FC, useEffect, useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { GoSettings } from "react-icons/go";
import { useDispatch } from "react-redux";
import {
  fetchAnalyticsData,
  fetchAppsList,
  toggleSettings,
} from "../../store/reducers/rootReducer";
import { formatDate } from "../../Utils/exportFormats";
import DataPicker from "../DatePicker/DatePicker";
import { DateState,AppDispatch } from "../../@types/index";
import "./FiltersContainer.css";

export const FiltersContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState<DateState>({
    start: "",
    end: "",
  });

  const handleSettingClick = (): void => {
    dispatch(toggleSettings());
  };

  const handleAPIQuery = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(
      fetchAnalyticsData({ startDate: "2022-01-01", endDate: "2022-01-31" })
    );

    setShowDatePicker(false);
  };

  useEffect(() => {
    dispatch(fetchAppsList());
  }, [dispatch]);

  return (
    <div className="filterContainer">
      <div className="filterContainer-MainSection">
        <button
          className="filterContainer-DatePickerRegion"
          onClick={() => setShowDatePicker(true)}
        >
          <IoCalendar />
          {date.start && date.end ? (
            <p>
              {formatDate(date.start)} - {formatDate(date.end)}
            </p>
          ) : (
            <p>Date Picker</p>
          )}
        </button>
        {showDatePicker && (
          <DataPicker
            date={date}
            setStartDate={(value: string) => setDate({ ...date, start: value })}
            setEndDate={(value: string) => setDate({ ...date, end: value })}
            setShowDatePicker={setShowDatePicker}
            handleAPIQuery={handleAPIQuery}
          />
        )}
        <button
          onClick={handleSettingClick}
          className="filterContainer-SettingsRegion"
        >
          <GoSettings className="icon" /> Settings
        </button>
      </div>
    </div>
  );
};
