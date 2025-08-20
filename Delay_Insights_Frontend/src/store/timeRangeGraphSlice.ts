// src/redux/slices/graphDataSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

type TimeRange = "week" | "month" | "year";

interface GraphDataState {
  selectedRange: TimeRange;
  data: any;
  status: "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GraphDataState = {
  selectedRange: "week",
  data: null,
  status: "loading",
  error: null,
};

const routeMap: Record<TimeRange, string> = {
  week: "http://localhost:5000/api/dashboard/fetch-weekly-data",
  month: "http://localhost:5000/api/dashboard/fetch-monthly-data",
  year: "http://localhost:5000/api/dashboard/fetch-yearly-data",
};

export const fetchGraphData = createAsyncThunk(
  "graphData/fetch",
  async (range: TimeRange, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(routeMap[range], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      const data = response.data;

      return data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong..!"
        );
      }
    }
  }
);

const timeRangeGraphSlice = createSlice({
  name: "graphData",
  initialState,
  reducers: {
    setSelectedRange(state, action: PayloadAction<TimeRange>) {
      state.selectedRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || "Fetch failed";
      });
  },
});

export const { setSelectedRange } = timeRangeGraphSlice.actions;
export default timeRangeGraphSlice.reducer;
