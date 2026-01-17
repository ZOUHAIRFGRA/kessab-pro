import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface EnumValue {
  value: string;
  label: string;
}

interface EnumState {
  paymentStatus: EnumValue[];
  paymentMethods: EnumValue[];
  loading: boolean;
}

export const fetchPaymentStatus = createAsyncThunk<EnumValue[], void>(
  "enum/paymentStatus",
  async () => {
    throw new Error("Deprecated: Use RTK Query enumsApi.useFetchPaymentStatusQuery instead");
  }
);

export const fetchPaymentMethods = createAsyncThunk<EnumValue[], void>(
  "enum/paymentMethods",
  async () => {
    throw new Error("Deprecated: Use RTK Query enumsApi.useFetchPaymentMethodsQuery instead");
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
