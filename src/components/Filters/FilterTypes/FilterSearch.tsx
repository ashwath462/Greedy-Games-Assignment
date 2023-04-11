import { useState, FC } from "react";
import { App, FilterBySearchProps } from "../../../@types/index";

const FilterBySearch: FC<FilterBySearchProps> = ({
  apps,
  query,
  setQuery,
  setActiveAppId,
  setShowFiltersBy,
}) => {
  const suggestionsList: App[] =
    query === ""
      ? apps
      : apps.filter(
          (app: App) =>
            app["app_name"].toLowerCase().indexOf(query.toLowerCase()) > -1
        );

  const clearFilters = () => {
    setActiveAppId("");
    setQuery("");
  };

  return (
    <div
      className="overlay"
      onClick={() =>
        setShowFiltersBy((prev) => ({
          ...prev,
          search: !prev.search,
        }))
      }
    >
      <div className="overlayFilters" onClick={(e) => e.stopPropagation()}>
        <p>Select App</p>
        <input
          name="query"
          type="text"
          className="query__input"
          placeholder="Type to search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="overlayFilters-Contents">
          {suggestionsList.map((app: App, index: number) => (
            <div key={index} onClick={() => setQuery(app.app_name)}>
              <h5>{app.app_name}</h5>
              <p>{app.app_id}</p>
            </div>
          ))}
        </div>
        <div className="overlayFilters-Footer">
          {query && (
            <button className="cancelButton" onClick={clearFilters}>
              Clear Filter
            </button>
          )}
          <button
            className="applyButton"
            onClick={() => {
              setActiveAppId(
                apps.filter((app: App) => app["app_name"] === query).length > 0
                  ? apps.filter((app: App) => app["app_name"] === query)[0][
                      "app_id"
                    ]
                  : ""
              );
              setShowFiltersBy((prev) => ({
                ...prev,
                search: !prev.search,
              }));
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBySearch;