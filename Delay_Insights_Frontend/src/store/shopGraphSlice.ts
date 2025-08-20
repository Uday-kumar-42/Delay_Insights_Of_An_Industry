import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShopGraphState {
  data: any;
  status: "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ShopGraphState = {
  data: null,
  status: "loading",
  error: null,
};

const route = "http://localhost:5000/api/dashboard/fetch-shop-data";

export const fetchShopGraphData = createAsyncThunk(
  "shopGraph/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return response.data.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong..!"
        );
      }
    }
  }
);

const shopGraphSlice = createSlice({
  name: "shopGraph",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopGraphData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShopGraphData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchShopGraphData.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export default shopGraphSlice.reducer;
