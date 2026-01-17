import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type {
  Category,
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from "../types/api";

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  loading: boolean;
  error: string | null;
}

interface ModifyCategoryParams {
  id: number;
  categoryData: CategoryUpdateRequest;
}

export const fetchCategories = createAsyncThunk<Category[], void>(
  "categories/fetch",
  async () => {
    throw new Error("Deprecated: Use RTK Query categoriesApi.useFetchCategoriesQuery instead");
  }
);

export const fetchCategoryById = createAsyncThunk<Category, number>(
  "categories/fetchById",
  async (id) => {
    throw new Error("Deprecated: Use RTK Query categoriesApi.useFetchCategoryByIdQuery instead");
  }
);

export const addCategory = createAsyncThunk<Category, CategoryCreateRequest>(
  "categories/add",
  async (categoryData) => {
    throw new Error("Deprecated: Use RTK Query categoriesApi.useCreateCategoryMutation instead");
  }
);

export const modifyCategory = createAsyncThunk<Category, ModifyCategoryParams>(
  "categories/update",
  async ({ id, categoryData }) => {
    throw new Error("Deprecated: Use RTK Query categoriesApi.useUpdateCategoryMutation instead");
  }
);

export const removeCategory = createAsyncThunk<number, number>(
  "categories/delete",
  async (id) => {
    throw new Error("Deprecated: Use RTK Query categoriesApi.useDeleteCategoryMutation instead");
  }
);

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Fetch Category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Update Category
      .addCase(modifyCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        const updatedCategory = action.payload;
        const index = state.categories.findIndex(
          (cat) => cat.id === updatedCategory.id
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory;
        }
      })
      .addCase(modifyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      // Delete Category
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default categorySlice.reducer;
