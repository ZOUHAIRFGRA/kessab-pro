import { api } from '../api';
import {
  Transaction,
  TransactionCreateRequest,
  TransactionUpdateRequest,
  ConsumeTransactionRequest,
  TransactionInvoice,
} from '../../types/api';

export const transactionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all transactions
    getTransactions: builder.query<Transaction[], void>({
      query: () => '/transactions',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Transaction' as const, id })),
              { type: 'Transactions', id: 'LIST' },
            ]
          : [{ type: 'Transactions', id: 'LIST' }],
      keepUnusedDataFor: 180, // 3 minutes
    }),

    // Get single transaction by ID
    getTransactionById: builder.query<Transaction, number>({
      query: (id) => `/transactions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Transaction', id }],
    }),

    // Get transactions by sale ID
    getTransactionsBySale: builder.query<Transaction[], number>({
      query: (saleId) => `/transactions/sale/${saleId}`,
      providesTags: (result, error, saleId) => [
        { type: 'Transactions', id: `sale-${saleId}` },
      ],
      keepUnusedDataFor: 180, // 3 minutes
    }),

    // Get transactions by buyer ID
    getTransactionsByBuyer: builder.query<Transaction[], number>({
      query: (buyerId) => `/transactions/buyer/${buyerId}`,
      providesTags: (result, error, buyerId) => [
        { type: 'Transactions', id: `buyer-${buyerId}` },
      ],
    }),

    // Get transaction invoice PDF
    getTransactionInvoice: builder.mutation<TransactionInvoice, number>({
      query: (id) => ({
        url: `/pdf/transaction/${id}`,
        method: 'POST',
      }),
    }),

    // Consume transaction (for buyer)
    consumeTransaction: builder.mutation<Transaction, { buyerId: number; data: ConsumeTransactionRequest }>({
      query: ({ buyerId, data }) => ({
        url: `/transactions/buyer/${buyerId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { buyerId }) => [
        { type: 'Transactions', id: 'LIST' },
        { type: 'Transactions', id: `buyer-${buyerId}` },
        { type: 'BuyerOverview', id: buyerId },
        'Sales',
      ],
    }),

    // Create transaction
    createTransaction: builder.mutation<Transaction, TransactionCreateRequest>({
      query: (payload) => ({
        url: '/transactions',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (result, error, payload) => [
        { type: 'Transactions', id: 'LIST' },
        ...(payload.saleId ? [{ type: 'Transactions' as const, id: `sale-${payload.saleId}` }] : []),
        ...(payload.buyerId ? [{ type: 'BuyerOverview' as const, id: payload.buyerId }] : []),
        'Sales',
      ],
    }),

    // Update transaction
    updateTransaction: builder.mutation<Transaction, { id: number; data: TransactionUpdateRequest }>({
      query: ({ id, data }) => ({
        url: `/transactions/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Transaction', id },
        { type: 'Transactions', id: 'LIST' },
        'BuyerOverview',
        'Sales',
      ],
    }),

    // Delete transaction
    deleteTransaction: builder.mutation<void, number>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Transaction', id },
        { type: 'Transactions', id: 'LIST' },
        'BuyerOverview',
        'Sales',
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetTransactionsBySaleQuery,
  useGetTransactionsByBuyerQuery,
  useGetTransactionInvoiceMutation,
  useConsumeTransactionMutation,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
