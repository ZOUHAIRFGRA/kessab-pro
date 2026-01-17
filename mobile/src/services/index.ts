// Base API
export { api, getBaseURL } from './api';

// Auth API
export {
  useLoginMutation,
  useRegisterMutation,
} from './endpoints/authApi';

// Animals API
export {
  animalsApi,
  useGetAnimalsQuery,
  useGetAnimalByIdQuery,
  useGetUnsoldAnimalsQuery,
  useGetAnimalsCountQuery,
  useGetAnimalsBySaleQuery,
  useGetAnimalsByBuyerQuery,
  useCreateAnimalMutation,
  useUpdateAnimalMutation,
  useDeleteAnimalMutation,
  useLazyGetAnimalByIdQuery,
  useLazyGetAnimalsQuery,
} from './endpoints/animalsApi';

// Buyers API
export {
  buyersApi,
  useGetBuyersQuery,
  useGetBuyerByIdQuery,
  useGetBuyerOverviewQuery,
  useCreateBuyerMutation,
  useUpdateBuyerMutation,
  useDeleteBuyerMutation,
  useLazyGetBuyerByIdQuery,
  useLazyGetBuyerOverviewQuery,
} from './endpoints/buyersApi';

// Sales API
export {
  salesApi,
  useGetSalesQuery,
  useGetSaleByIdQuery,
  useGetSalesByBuyerIdQuery,
  useGetSaleInvoiceMutation,
  useCloseSaleMutation,
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useDeleteSaleMutation,
  useLazyGetSaleByIdQuery,
  useLazyGetSalesQuery,
} from './endpoints/salesApi';

// Transactions API
export {
  transactionsApi,
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetTransactionsBySaleQuery,
  useGetTransactionsByBuyerQuery,
  useGetTransactionInvoiceMutation,
  useConsumeTransactionMutation,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} from './endpoints/transactionsApi';

// Categories API
export {
  categoriesApi,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryIconsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from './endpoints/categoriesApi';

// Enums API
export {
  enumsApi,
  useGetPaymentStatusQuery,
  useGetPaymentMethodsQuery,
} from './endpoints/enumsApi';

// Users API
export {
  usersApi,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from './endpoints/usersApi';

// Logs API
export {
  logsApi,
  useGetMedicalLogsByAnimalQuery,
  useCreateMedicalLogMutation,
  useUpdateMedicalLogMutation,
  useDeleteMedicalLogMutation,
  useGetActivityLogsByAnimalQuery,
  useGetAllActivityLogsQuery,
  useCreateActivityLogMutation,
  useUpdateActivityLogMutation,
  useDeleteActivityLogMutation,
} from './endpoints/logsApi';
