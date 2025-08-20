import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

interface mostFreqObject {
  delay_code: number;
  descr: string;
}

interface SummaryState {
  totalDelaysToday: number;
  cumulativeDelayHours: number;
  mostFrequentCause: mostFreqObject;
  departmentWithMinDelays: string;
  departmentWithMaxDelays: string;
  mttr: number;
  lastFetched: null | number;
}

const initialState: SummaryState = {
  totalDelaysToday: 0,
  cumulativeDelayHours: 0,
  mostFrequentCause: { delay_code: 0, descr: "" },
  departmentWithMinDelays: "",
  departmentWithMaxDelays: "",
  mttr: 0,
  lastFetched: null,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    setTotalDelaysToday: (state, action: PayloadAction<number>) => {
      state.totalDelaysToday = action.payload;
    },
    setCumulativeDelayHours: (state, action: PayloadAction<number>) => {
      state.cumulativeDelayHours = action.payload;
    },
    setDepartmentWithMinDelays: (state, action: PayloadAction<string>) => {
      state.departmentWithMinDelays = action.payload;
    },
    setMostFrequentCause: (state, action: PayloadAction<mostFreqObject>) => {
      state.mostFrequentCause = action.payload;
    },
    setDepartmentWithMaxDelays: (state, action: PayloadAction<string>) => {
      state.departmentWithMaxDelays = action.payload;
    },
    setMttr: (state, action: PayloadAction<number>) => {
      state.mttr = action.payload;
    },
    setLastFetched: (state, action: PayloadAction<number>) => {
      state.lastFetched = action.payload;
    },
  },
});

export const {
  setTotalDelaysToday,
  setCumulativeDelayHours,
  setDepartmentWithMinDelays,
  setMostFrequentCause,
  setDepartmentWithMaxDelays,
  setMttr,
  setLastFetched,
} = summarySlice.actions;

export default summarySlice.reducer;
