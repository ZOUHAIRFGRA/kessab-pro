import { api } from '../api';
import {
  Category,
  CategoryIcon,
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from '../../types/api';

// Internal payload type for API
interface CategoryPayload {
  typeName: string;
  icon: { id: number };
}

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query<Category[], void>({
      query: () => '/animal-categories',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
      keepUnusedDataFor: 3600, // 1 hour
    }),

    // Get single category by ID
    getCategoryById: builder.query<Category, number>({
      query: (id) => `/animal-categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
      keepUnusedDataFor: 3600, // 1 hour
    }),

    // Get category icons
    getCategoryIcons: builder.query<CategoryIcon[], void>({
      query: () => '/animal-icons',
      providesTags: ['CategoryIcons'],
      keepUnusedDataFor: 86400, // 24 hours
    }),

    // Create category
    createCategory: builder.mutation<Category, CategoryCreateRequest>({
      query: (categoryData) => {
        const payload: CategoryPayload = {
          typeName: categoryData.typeName,
          icon: { id: categoryData.iconId },
        };
        return {
          url: '/animal-categories',
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

    // Update category
    updateCategory: builder.mutation<Category, { id: number; data: CategoryUpdateRequest }>({
      query: ({ id, data }) => {
        const payload: Partial<CategoryPayload> = {
          ...(data.typeName && { typeName: data.typeName }),
          ...(data.iconId && { icon: { id: data.iconId } }),
        };
        return {
          url: `/animal-categories/${id}`,
          method: 'PUT',
          body: payload,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Category', id },
        { type: 'Categories', id: 'LIST' },
      ],
    }),

    // Delete category
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/animal-categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Category', id },
        { type: 'Categories', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryIconsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
