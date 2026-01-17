import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../services/api';
import authReducer from '../features/authSlice';
import animalReducer from '../features/animalSlice';
import buyerReducer from '../features/buyerSlice';
import saleReducer from '../features/saleSlice';
import categoryReducer from '../features/categorySlice';
import transactionReducer from '../features/transactionSlice';
import userReducer from '../features/userSlice';
import enumReducer from '../features/enumSlice';
import iconsReducer from '../features/iconsSlice';
import animalMedicalLogReducer from '../features/animalMedicalLogSlice';
import animalActivitiesLogReducer from '../features/animalActivitiesLogSlice';

// Import all endpoint APIs to ensure they're registered
import '../services/endpoints/animalsApi';
import '../services/endpoints/buyersApi';
import '../services/endpoints/salesApi';
import '../services/endpoints/transactionsApi';
import '../services/endpoints/categoriesApi';
import '../services/endpoints/enumsApi';
import '../services/endpoints/usersApi';
import '../services/endpoints/logsApi';

export const store = configureStore({
  reducer: {
    // RTK Query API reducer
    [api.reducerPath]: api.reducer,
    // Keep auth slice for token persistence and isAuthenticated state
    auth: authReducer,
    // Legacy reducers (deprecated - migrate to RTK Query)
    animals: animalReducer,
    buyers: buyerReducer,
    sales: saleReducer,
    categories: categoryReducer,
    transactions: transactionReducer,
    user: userReducer,
    enums: enumReducer,
    icons: iconsReducer,
    medicalLogs: animalMedicalLogReducer,
    activityLogs: animalActivitiesLogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in RTK Query actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
});

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
