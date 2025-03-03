import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getCategories, getCategoryById } from "../api/categoryApi";

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

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id) => {
    const response = await getCategoryById(id);
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
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

  },
});

export default categorySlice.reducer;
