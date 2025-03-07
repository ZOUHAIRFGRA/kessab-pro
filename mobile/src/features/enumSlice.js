import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getCategories } from "../api/categoryApi";
import enumApi from "../api/enumApi";

export const fetchPaymentStatus = createAsyncThunk(
  "enum/paymentStatus",
  async () => {
    const response = await enumApi.getPaymentStatus();
    return response.data;
  }
);
export const fetchPaymentMethods = createAsyncThunk(
  "enum/paymentMethods",
  async () => {
    const response = await enumApi.getPaymentMethods();
    return response.data;
  }
);

const enumSlice = createSlice({
  name: "categories",
  initialState: { paymentStatus: [], paymentMethods: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      });
  },
});

export default enumSlice.reducer;
