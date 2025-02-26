import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getCategories } from "../api/categoryApi";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await getCategories();
    return response;
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (categoryData) => {
    const response = await createCategory(categoryData);
    return response;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: { categories: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export default categorySlice.reducer;
