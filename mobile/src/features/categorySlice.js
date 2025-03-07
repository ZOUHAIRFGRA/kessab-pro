import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../api/categoryApi";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await getCategories();
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

export const addCategory = createAsyncThunk(
  "categories/add",
  async (categoryData) => {
    const response = await createCategory(categoryData);
    return response;
  }
);

export const modifyCategory = createAsyncThunk(
  "categories/update",
  async ({ id, categoryData }) => {
    const response = await updateCategory(id, categoryData);
    return response;
  }
);

export const removeCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    await deleteCategory(id);
    return id; 
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: { categories: [], selectedCategory: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Category
      .addCase(modifyCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const index = state.categories.findIndex((cat) => cat.id === updatedCategory.id);
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(modifyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Category
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;