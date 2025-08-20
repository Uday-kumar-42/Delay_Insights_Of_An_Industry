import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  emp_name: null | string;
  shop_code: null | number;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: EmployeeState = {
  emp_name: null,
  shop_code: null,
  isAuthenticated: false,
  isLoading: true,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeName: (
      state,
      action: PayloadAction<{ emp_name: string; shop_code: number }>
    ) => {
      state.emp_name = action.payload.emp_name;
      state.shop_code = action.payload.shop_code;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearEmployee: (state) => {
      state.emp_name = null;
      state.shop_code = null;
      state.isAuthenticated = false;
      state.isLoading = true;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setEmployeeName, clearEmployee, setIsLoading } =
  employeeSlice.actions;

export default employeeSlice.reducer;
