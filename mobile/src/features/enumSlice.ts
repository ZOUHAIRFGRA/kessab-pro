import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import enumApi, { EnumValue } from "../api/enumApi";

interface EnumState {
  paymentStatus: EnumValue[];
  paymentMethods: EnumValue[];
  loading: boolean;
}

export const fetchPaymentStatus = createAsyncThunk<EnumValue[], void>(
  "enum/paymentStatus",
  async () => {
    const response = await enumApi.getPaymentStatus();
    return response.data;
  }
);

export const fetchPaymentMethods = createAsyncThunk<EnumValue[], void>(
  "enum/paymentMethods",
  async () => {
    const response = await enumApi.getPaymentMethods();
    return response.data;
  }
);

const initialState: EnumState = {
  paymentStatus: [],
  paymentMethods: [],
  loading: false,
};

const enumSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentStatus.fulfilled, (state, action: PayloadAction<EnumValue[]>) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action: PayloadAction<EnumValue[]>) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      });
  },
});

export default enumSlice.reducer;
