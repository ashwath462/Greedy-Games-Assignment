import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalyticsData, App, RootState } from "../../@types/index";

export const fetchAnalyticsData = createAsyncThunk<
  AnalyticsData[],
  { startDate: string; endDate: string },
  { rejectValue: boolean }
>(
  "data/fetchAnalyticsData",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `
        https://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
      );
      const resData = await res.json();
      if (!resData?.data) {
        return rejectWithValue(false);
      }

      const result = resData.data.map((item: any) => {
        item["fill rate"] = parseInt(
          ((item.requests / item.responses) * 100).toFixed(2)
        );
        item["ctr"] = parseInt(
          ((item.clicks / item.impressions) * 100).toFixed(2)
        );
        return item;
      });
      return result;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(false);
    }
  }
);

export const fetchAppsList = createAsyncThunk<App[], void>(
  "apps/fetchAppsList",
  async () => {
    const response = await fetch("https://go-dev.greedygame.com/v3/dummy/apps");
    const data = await response.json();
    if (!data?.data) {
      throw new Error("Failed to fetch apps list");
    }
    return data.data;
  }
);

const initialState: RootState = {
  analyticsData: [],
  appsList: [],
  isLoading: false,
  error: false,
  selectedColumns: [
    "date",
    "app_id",
    "requests",
    "responses",
    "impressions",
    "clicks",
    "revenue",
    "fill rate",
    "ctr",
  ],
  showSettings: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleSettings: (state) => {
      state.showSettings = !state.showSettings;
    },
    selectedColumn: (state, action: PayloadAction<string[]>) => {
      state.selectedColumns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.analyticsData = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch analytics data";
      })
      .addCase(fetchAppsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppsList.fulfilled, (state, action) => {
        state.appsList = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAppsList.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch apps list";
      });
  },
});

export const { toggleSettings, selectedColumn } = dataSlice.actions;
export default dataSlice.reducer;
