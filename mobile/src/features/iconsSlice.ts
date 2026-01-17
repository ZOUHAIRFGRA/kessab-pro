import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCategoriesIcons } from "../api/categoryIconsApi"; 

interface Icon {
  [key: string]: any;
}

interface IconState {
  icons: Icon[];
  loading: boolean;
}

export const fetchCategoriesIcons = createAsyncThunk<Icon[], void>(
  "icons/fetch",
  async () => {
    const response = await getCategoriesIcons();
    return response;
  }
);

const initialState: IconState = {
  icons: [],
  loading: false,
};

const iconsSlice = createSlice({
  name: "icons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesIcons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesIcons.fulfilled, (state, action: PayloadAction<Icon[]>) => {
        state.loading = false;
        state.icons = action.payload;
      });
  },
});

export default iconsSlice.reducer;
