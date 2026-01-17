import { api } from '../api';
import {
  Sale,
  SaleListResponse,
  SaleQuery,
  SaleCreateRequest,
  SaleUpdateRequest,
  SaleInvoice,
} from '../../types/api';

export const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated sales list
    getSales: builder.query<SaleListResponse, SaleQuery | void>({
      query: (params) => ({
        url: '/sales',
        params: params || { page: 0, size: 10 },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Sale' as const, id })),
              { type: 'Sales', id: 'LIST' },
            ]
          : [{ type: 'Sales', id: 'LIST' }],
      keepUnusedDataFor: 180, // 3 minutes
    }),

    // Get single sale by ID
    getSaleById: builder.query<Sale, number>({
      query: (id) => `/sales/${id}`,
      providesTags: (result, error, id) => [{ type: 'Sale', id }],
      keepUnusedDataFor: 180, // 3 minutes
    }),

    // Get sales by buyer ID
    getSalesByBuyerId: builder.query<Sale[], number>({
      query: (buyerId) => `/sales/buyer/${buyerId}`,
      providesTags: (result, error, buyerId) => [
        { type: 'Sales', id: `buyer-${buyerId}` },
      ],
    }),

    // Get sale invoice PDF
    getSaleInvoice: builder.mutation<SaleInvoice, number>({
      query: (id) => ({
        url: `/pdf/sale/${id}`,
        method: 'POST',
      }),
    }),

    // Close sale
    closeSale: builder.mutation<Sale, number>({
      query: (id) => ({
        url: `/sales/${id}/close`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Sale', id },
        { type: 'Sales', id: 'LIST' },
        'BuyerOverview',
      ],
    }),

    // Create sale
    createSale: builder.mutation<Sale, SaleCreateRequest>({
      query: (payload) => ({
        url: '/sales',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [
        { type: 'Sales', id: 'LIST' },
        'UnsoldAnimals',
        'AnimalsCount',
        'BuyerOverview',
      ],
    }),

    // Update sale
    updateSale: builder.mutation<Sale, { id: number; data: SaleUpdateRequest }>({
      query: ({ id, data }) => ({
        url: `/sales/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Sale', id },
        { type: 'Sales', id: 'LIST' },
        'UnsoldAnimals',
        'BuyerOverview',
      ],
    }),

    // Delete sale
    deleteSale: builder.mutation<void, number>({
      query: (id) => ({
        url: `/sales/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Sale', id },
        { type: 'Sales', id: 'LIST' },
        'UnsoldAnimals',
        'AnimalsCount',
        'BuyerOverview',
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useGetSalesByBuyerIdQuery,
  useGetSaleInvoiceMutation,
  useCloseSaleMutation,
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
  // Lazy queries for prefetching
  useLazyGetSaleByIdQuery,
  useLazyGetSalesQuery,
} = salesApi;
