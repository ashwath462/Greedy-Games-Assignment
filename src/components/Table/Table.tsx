import { useState, FC } from "react";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";

import FilterByRange from "../Filters/FilterTypes/FilterRange";
import FilterBySearch from "../Filters/FilterTypes/FilterSearch";
import {
  calculateTotalCountOfAttr,
  formateAttrValues,
} from "../Filters/FilterTypes/FilterSwitch";
import "./Table.css";
import { RootState } from "../../@types/index";

const Table: FC = () => {
  const fetchedData = useSelector(
    (state: RootState) => state.data.analyticsData
  );
  const hasError = useSelector((state: RootState) => state.data.error);
  const appList = useSelector((state: RootState) => state.data.appsList);
  const colHeaders = useSelector(
    (state: RootState) => state.data.selectedColumns
  );

  const [type, setType] = useState<{ label: string }>({
    label: "",
  });
  const [showFiltersBy, setShowFiltersBy] = useState<{
    search: boolean;
    range: boolean;
  }>({
    search: false,
    range: false,
  });
  const [range, setRange] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

  const [query, setQuery] = useState<string>("");
  const [activeAppId, setActiveAppId] = useState<string>("");

  const filteredData = activeAppId
    ? fetchedData.filter((item: any) => item.app_id === activeAppId)
    : range.start
    ? fetchedData.filter((item: any) => {
        return (
          parseInt(item[type.label]) >= range.start &&
          parseInt(item[type.label]) <= range.end
        );
      })
    : fetchedData;


  const handleFilterBy = (config: "search" | "range") => {
    if (filteredData.length > 0) {
      setShowFiltersBy((prev) => ({
        ...showFiltersBy,
        [config]: !prev[config],
      }));
    }
  };

  return (
    <>
      <div className="tableContainer">
        {filteredData?.length === 0 || hasError ? (
          <div className="tableContainer-EmptyContent">
            <div className="tableContainer-EmptyImage">
              <img
                className="error"
                src="../assets/images/error-Image.svg"
                alt="error"
              />
            </div>
            <div className="tableContainer-EmptyBody">
              <h3>Hey! Something's off!</h3>
              <h3>We couldn't display the given data</h3>
              <p>Try changing your filters or selecting a different date</p>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                {colHeaders.map((colName: any, key: any) => (
                  <th
                    key={key}
                    className="headerCellName"
                    onClick={() => {
                      if (colName !== "app_id") {
                        setType({
                          label: colName,
                        });
                      }
                    }}
                  >
                    <FaFilter />
                    {colName === "app_id" ? (
                      <p onClick={() => handleFilterBy("search")}>App</p>
                    ) : (
                      <p
                        onClick={() => {
                          if (colName === "date") return;
                          handleFilterBy("range");
                        }}
                      >
                        {colName}
                      </p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {filteredData?.length > 0 &&
                  colHeaders.map((key: any, index: any) => (
                    <td key={index} className="totalValues">
                      {calculateTotalCountOfAttr(filteredData, key)}
                    </td>
                  ))}
              </tr>
              {filteredData?.map((row: any, rowKey: any) => (
                <tr key={rowKey}>
                  {colHeaders.map((colName: any, colKey: any) => {
                    return (
                      <td key={colKey}>
                        {formateAttrValues(appList, colName, row[colName])}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showFiltersBy?.search && (
        <FilterBySearch
          data={filteredData}
          apps={appList}
          query={query}
          setQuery={setQuery}
          setActiveAppId={setActiveAppId}
          setShowFiltersBy={setShowFiltersBy}
        />
      )}
      {showFiltersBy?.range && (
        <FilterByRange
          data={filteredData}
          apps={appList}
          min={Math.floor(
            Math.min(...fetchedData.map((item: any) => item[type.label]))
          )}
          max={Math.floor(
            Math.max(...fetchedData.map((item: any) => item[type.label]))
          )}
          activeId={type.label}
          setShowFiltersBy={setShowFiltersBy}
          setRange={setRange}
        />
      )}
    </>
  );
};

export default Table;
