import { api } from '../api';
import {
  Animal,
  AnimalListResponse,
  AnimalFilterParams,
} from '../../types/api';

export const animalsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated animals list
    getAnimals: builder.query<AnimalListResponse, AnimalFilterParams | void>({
      query: (params) => ({
        url: '/animals',
        params: params || { page: 0, size: 10 },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Animal' as const, id })),
              { type: 'Animals', id: 'LIST' },
            ]
          : [{ type: 'Animals', id: 'LIST' }],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Get single animal by ID
    getAnimalById: builder.query<Animal, string>({
      query: (id) => `/animals/${id}`,
      providesTags: (result, error, id) => [{ type: 'Animal', id }],
      keepUnusedDataFor: 600, // 10 minutes
    }),

    // Get unsold animals
    getUnsoldAnimals: builder.query<Animal[], void>({
      query: () => '/animals/unsold',
      providesTags: ['UnsoldAnimals'],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Get animals count
    getAnimalsCount: builder.query<number, void>({
      query: () => '/animals/count',
      providesTags: ['AnimalsCount'],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Get animals by sale ID
    getAnimalsBySale: builder.query<Animal[], string>({
      query: (saleId) => `/animals/by-sale/${saleId}`,
      providesTags: (result, error, saleId) => [{ type: 'Animals', id: `sale-${saleId}` }],
    }),

    // Get animals by buyer ID
    getAnimalsByBuyer: builder.query<Animal[], string>({
      query: (buyerId) => `/animals/by-buyer/${buyerId}`,
      providesTags: (result, error, buyerId) => [{ type: 'Animals', id: `buyer-${buyerId}` }],
    }),

    // Create animal (FormData for image upload)
    createAnimal: builder.mutation<Animal, FormData>({
      query: (formData) => ({
        url: '/animals',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['Animals', 'AnimalsCount', 'UnsoldAnimals'],
    }),

    // Update animal (FormData for image upload)
    updateAnimal: builder.mutation<Animal, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/animals/${id}`,
        method: 'PUT',
        body: data,
        formData: true,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Animal', id },
        'Animals',
        'UnsoldAnimals',
      ],
    }),

    // Delete animal
    deleteAnimal: builder.mutation<void, string>({
      query: (id) => ({
        url: `/animals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Animal', id },
        'Animals',
        'AnimalsCount',
        'UnsoldAnimals',
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAnimalsQuery,
  useGetAnimalByIdQuery,
  useGetUnsoldAnimalsQuery,
  useGetAnimalsCountQuery,
  useGetAnimalsBySaleQuery,
  useGetAnimalsByBuyerQuery,
  useCreateAnimalMutation,
  useUpdateAnimalMutation,
  useDeleteAnimalMutation,
  // Lazy queries for prefetching
  useLazyGetAnimalByIdQuery,
  useLazyGetAnimalsQuery,
} = animalsApi;
