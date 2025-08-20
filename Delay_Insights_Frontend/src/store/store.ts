import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "./summarySlice";
import employeeReducer from "./employeeSlice";
import timeRangegraphReducer from "./timeRangeGraphSlice";
import eqptGraphReducer from "./shopGraphSlice";

const store = configureStore({
  reducer: {
    summary: summaryReducer,
    employee: employeeReducer,
    timeRangegraph: timeRangegraphReducer,
    shopGraph: eqptGraphReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;
