import { api } from '../api';
import { PaymentStatus, PaymentMethod } from '../../types/api';

export const enumsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get payment status options
    getPaymentStatus: builder.query<PaymentStatus[], void>({
      query: () => '/enums/payment_status',
      providesTags: ['PaymentStatus'],
      keepUnusedDataFor: 86400, // 24 hours
    }),

    // Get payment methods
    getPaymentMethods: builder.query<PaymentMethod[], void>({
      query: () => '/enums/payment_method',
      providesTags: ['PaymentMethods'],
      keepUnusedDataFor: 86400, // 24 hours
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPaymentStatusQuery,
  useGetPaymentMethodsQuery,
} = enumsApi;
