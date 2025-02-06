import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getCategoriesIcons} from "../api/categoryIconsApi"; 


export const fetchCategoriesIcons = createAsyncThunk("icons/fetch", async () => {
  const response = await getCategoriesIcons();
//   console.log(response);
  return response;
});

const iconsSlice = createSlice({
  name: "icons",
  initialState: { icons: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesIcons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesIcons.fulfilled, (state, action) => {
        state.loading = false;
        state.icons = action.payload;
      })
  },
});

export default iconsSlice.reducer;
