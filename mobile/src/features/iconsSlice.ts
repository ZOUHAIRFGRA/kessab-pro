import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryIcon {
  id: number;
  name: string;
  icon: string;
} 

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
    throw new Error("Deprecated: Use RTK Query iconsApi.useFetchCategoriesIconsQuery instead");
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
