import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { rootReducer } from "../store/reducers/rootReducer";


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;


export interface DataPickerProps {
  handleAPIQuery: (e: FormEvent<HTMLFormElement>) => void;
  date: { start: string; end: string };
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setShowDatePicker: (show: boolean) => void;
}

export interface FilterByRangeProps {
  setShowFiltersBy: React.Dispatch<React.SetStateAction<{ search: boolean; range: boolean }>>;
  setRange: React.Dispatch<React.SetStateAction<{ start: number; end: number }>>;
  min: number;
  max: number;
  data: any;
  apps: any;
  activeId: string;
}

export interface App {
  app_id: string;
  app_name: string;
}

export interface FilterBySearchProps {
  data: any
  apps: App[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setActiveAppId: React.Dispatch<React.SetStateAction<string>>;
  setShowFiltersBy: React.Dispatch<React.SetStateAction<{ range: boolean; search: boolean; }>>
}

export interface DateState {
  start: string;
  end: string;
}

export interface SettingProps {
  colHeaders: string[],
  setColHeaders: React.Dispatch<React.SetStateAction<string[]>>,
  selectedList: string[],
  setSelectedList: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AnalyticsData {
  date: string;
  app_id: string;
  requests: number;
  responses: number;
  impressions: number;
  clicks: number;
  revenue: number;
  "fill rate": number;
  ctr: number;
}

export interface AppData {
  id: string;
  name: string;
  os: string;
  created_at: string;
}

export interface RootState {
  analyticsData: AnalyticsData[];
  appsList: AppData[];
  isLoading: boolean;
  error: boolean;
  selectedColumns: string[];
  showSettings: boolean;
}
