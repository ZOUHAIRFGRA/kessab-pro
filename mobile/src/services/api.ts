import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_IP } from '@env';
import { logout } from '../features/authSlice';

// Base URL configuration
export const getBaseURL = (): string => {
  const serverIp = SERVER_IP || '192.168.1.8';
  const isProd = process.env.EXPO_PUBLIC_IS_PROD === 'true';

  if (isProd) {
    return 'http://79.72.60.38:9007';
  } else {
    if (Platform.OS === 'android') {
      const isExpoGo = Constants.executionEnvironment === 'expo';
      return isExpoGo ? 'http://10.0.2.2:8080' : `http://${serverIp}:8080`;
    } else if (Platform.OS === 'ios') {
      return `http://${serverIp}:8080`;
    }
  }
  return `http://${serverIp}:8080`;
};

// Custom base query with auth header injection
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api`,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  timeout: 10000,
});

// Base query with auto-logout on 401/403
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    await AsyncStorage.clear();
    api.dispatch(logout());
  }

  return result;
};

// Tag types for cache invalidation
export const tagTypes = [
  'Animal',
  'Animals',
  'AnimalsCount',
  'UnsoldAnimals',
  'Buyer',
  'Buyers',
  'BuyerOverview',
  'Sale',
  'Sales',
  'Transaction',
  'Transactions',
  'Category',
  'Categories',
  'CategoryIcons',
  'MedicalLog',
  'MedicalLogs',
  'ActivityLog',
  'ActivityLogs',
  'User',
  'PaymentStatus',
  'PaymentMethods',
] as const;

// Base API - endpoints will be injected
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes,
  keepUnusedDataFor: 300, // 5 minutes default cache
  endpoints: () => ({}),
});
