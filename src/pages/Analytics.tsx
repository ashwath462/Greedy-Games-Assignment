import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { FiltersContainer } from "../components/Filters/FiltersContainer";
import Settings from "../components/Settings/Settings";
import Table from "../components/Table/Table";
import "./Analytics.css";
import { RootState } from "../@types/index";

const Analytics: FC = () => {
  const showSettings = useSelector(
    (state: RootState) => state.data.showSettings
  );
  const initialColHeaders = useSelector(
    (state: RootState) => state.data.selectedColumns
  );
  const [colHeaders, setColHeaders] = useState<string[]>(initialColHeaders);
  const [selectedList, setSelectedList] = useState<string[]>(initialColHeaders);

  return (
    <div className="Analytics">
      <aside className="sideContent"></aside>
      <div className="container">
        <div className="main">
          <h2 className="heading">Analytics</h2>
          <FiltersContainer />
          {showSettings && (
            <Settings
              colHeaders={colHeaders}
              setColHeaders={setColHeaders}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          )}
        </div>
        <Table />
      </div>
    </div>
  );
};

export default Analytics;
