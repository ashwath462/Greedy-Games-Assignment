import { useDispatch } from "react-redux";
import {
  selectedColumn,
  toggleSettings,
} from "../../store/reducers/rootReducer";
import { SettingProps } from "../../@types/index";
import "./Settings.css";

const Settings: React.FC<SettingProps> = ({
  colHeaders,
  setColHeaders,
  selectedList,
  setSelectedList,
}) => {
  const dispatch = useDispatch();

  const onDragStart = (e: any, id: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("dragging");
    e.dataTransfer.setData("id", id.toString());
  };

  const onDragEnd = (e: any) => {
    e.target.classList.remove("dragging");
  };

  const onDrop = (e: any) => {
    let id = parseInt(e.dataTransfer.getData("id"));
    let insertBefore = parseInt(
      e.currentTarget.getAttribute("data-index") || "0"
    );
    let item = colHeaders[id];
    let shuffledArray = [...colHeaders];
    shuffledArray.splice(id, 1);
    shuffledArray.splice(insertBefore, 0, item);
    setColHeaders(shuffledArray);
  };

  const handleSelectFilter = (data: string) => {
    let filterText = data;
    if (filterText === "date" || filterText === "app_id") {
      return;
    }
    selectedList.includes(filterText)
      ? setSelectedList((prev) => prev.filter((fTxt) => fTxt !== filterText))
      : setSelectedList([...selectedList, filterText]);
  };

  const handleApplySettings = () => {
    const filteredResults = colHeaders.filter((item) =>
      selectedList.includes(item)
    );
    dispatch(selectedColumn(filteredResults));
    dispatch(toggleSettings());
  };

  const handleToggleSettings = () => {
    dispatch(toggleSettings());
  };

  return (
    <div className="settingsContainer">
      <h5 className="secondary-heading">Dimensions and Metrics</h5>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="settingsContainer-DragZone"
      >
        {colHeaders?.map((colName, index) => (
          <div
            className={`settingsContainer-fields ${
              selectedList.includes(colName) ? `selected` : ""
            }`}
            key={index}
            data-index={index}
            onClick={() => handleSelectFilter(colName)}
            onDragStart={(e) => onDragStart(e, index)}
            onDragEnd={onDragEnd}
            draggable
          >
            {colName === "app_id"
              ? "App"
              : colName === "requests" || colName === "responses"
              ? `Ad ${colName}`
              : colName}
          </div>
        ))}
      </div>
      <div className="settingsContainer-footer">
        <div className="cancelButton" onClick={handleToggleSettings}>
          Close
        </div>
        <div className="applyButton" onClick={handleApplySettings}>
          Apply Changes
        </div>
      </div>
    </div>
  );
};

export default Settings;
