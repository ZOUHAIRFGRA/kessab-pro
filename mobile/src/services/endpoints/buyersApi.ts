import { api } from '../api';
import {
  Buyer,
  BuyerListResponse,
  BuyerQuery,
  BuyerCreateRequest,
  BuyerUpdateRequest,
  BuyerOverview,
} from '../../types/api';

export const buyersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated buyers list
    getBuyers: builder.query<BuyerListResponse, BuyerQuery | void>({
      query: (params) => ({
        url: '/buyers',
        params: params || { page: 0, size: 10 },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Buyer' as const, id })),
              { type: 'Buyers', id: 'LIST' },
            ]
          : [{ type: 'Buyers', id: 'LIST' }],
      keepUnusedDataFor: 180, // 3 minutes
    }),

    // Get single buyer by ID
    getBuyerById: builder.query<Buyer, number>({
      query: (id) => `/buyers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Buyer', id }],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Get buyer overview (aggregated data)
    getBuyerOverview: builder.query<BuyerOverview, number>({
      query: (id) => `/buyers/${id}/overview`,
      providesTags: (result, error, id) => [{ type: 'BuyerOverview', id }],
      keepUnusedDataFor: 180, // 3 minutes
    }),

    // Create buyer
    createBuyer: builder.mutation<Buyer, BuyerCreateRequest>({
      query: (payload) => ({
        url: '/buyers',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Buyers', id: 'LIST' }],
    }),

    // Update buyer with optimistic update
    updateBuyer: builder.mutation<Buyer, { id: number; data: BuyerUpdateRequest }>({
      query: ({ id, data }) => ({
        url: `/buyers/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Buyer', id },
        { type: 'Buyers', id: 'LIST' },
        { type: 'BuyerOverview', id },
      ],
      // Optimistic update
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          buyersApi.util.updateQueryData('getBuyerById', id, (draft) => {
            Object.assign(draft, data);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Delete buyer
    deleteBuyer: builder.mutation<void, number>({
      query: (id) => ({
        url: `/buyers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Buyer', id },
        { type: 'Buyers', id: 'LIST' },
        { type: 'BuyerOverview', id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBuyersQuery,
  useGetBuyerByIdQuery,
  useGetBuyerOverviewQuery,
  useCreateBuyerMutation,
  useUpdateBuyerMutation,
  useDeleteBuyerMutation,
  // Lazy queries for prefetching
  useLazyGetBuyerByIdQuery,
  useLazyGetBuyerOverviewQuery,
} = buyersApi;
