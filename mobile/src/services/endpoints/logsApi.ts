import { api } from '../api';
import {
  MedicalLog,
  MedicalLogRequest,
  ActivityLog,
  ActivityLogRequest,
} from '../../types/api';

export const logsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // =====================
    // Medical Logs
    // =====================

    // Get medical logs for an animal
    getMedicalLogsByAnimal: builder.query<MedicalLog[], string>({
      query: (animalId) => `/animal-medical-logs/animal/${animalId}`,
      providesTags: (result, error, animalId) => [
        { type: 'MedicalLogs', id: `animal-${animalId}` },
      ],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Create medical log
    createMedicalLog: builder.mutation<MedicalLog, MedicalLogRequest>({
      query: (logData) => ({
        url: '/animal-medical-logs',
        method: 'POST',
        body: logData,
      }),
      invalidatesTags: (result, error, logData) => [
        { type: 'MedicalLogs', id: `animal-${logData.animalId}` },
      ],
    }),

    // Update medical log
    updateMedicalLog: builder.mutation<MedicalLog, { id: string; data: Partial<MedicalLogRequest> }>({
      query: ({ id, data }) => ({
        url: `/animal-medical-logs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { data }) => [
        { type: 'MedicalLog', id: result?.id },
        ...(data.animalId ? [{ type: 'MedicalLogs' as const, id: `animal-${data.animalId}` }] : []),
      ],
    }),

    // Delete medical log
    deleteMedicalLog: builder.mutation<void, { id: number; animalId: number }>({
      query: ({ id }) => ({
        url: `/animal-medical-logs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { animalId }) => [
        { type: 'MedicalLogs', id: `animal-${animalId}` },
      ],
    }),

    // =====================
    // Activity Logs
    // =====================

    // Get activity logs for an animal
    getActivityLogsByAnimal: builder.query<ActivityLog[], string>({
      query: (animalId) => `/animal-activities-logs/animal/${animalId}`,
      providesTags: (result, error, animalId) => [
        { type: 'ActivityLogs', id: `animal-${animalId}` },
      ],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Get all activity logs
    getAllActivityLogs: builder.query<ActivityLog[], void>({
      query: () => '/animal-activities-logs',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ActivityLog' as const, id })),
              { type: 'ActivityLogs', id: 'LIST' },
            ]
          : [{ type: 'ActivityLogs', id: 'LIST' }],
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Create activity log
    createActivityLog: builder.mutation<ActivityLog, ActivityLogRequest>({
      query: (logData) => ({
        url: '/animal-activities-logs',
        method: 'POST',
        body: logData,
      }),
      invalidatesTags: (result, error, logData) => [
        { type: 'ActivityLogs', id: `animal-${logData.animalId}` },
        { type: 'ActivityLogs', id: 'LIST' },
      ],
    }),

    // Update activity log
    updateActivityLog: builder.mutation<ActivityLog, { id: number; data: Partial<ActivityLogRequest> }>({
      query: ({ id, data }) => ({
        url: `/animal-activities-logs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id, data }) => [
        { type: 'ActivityLog', id },
        ...(data.animalId ? [{ type: 'ActivityLogs' as const, id: `animal-${data.animalId}` }] : []),
        { type: 'ActivityLogs', id: 'LIST' },
      ],
    }),

    // Delete activity log
    deleteActivityLog: builder.mutation<void, { id: number; animalId: number }>({
      query: ({ id }) => ({
        url: `/animal-activities-logs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { animalId }) => [
        { type: 'ActivityLogs', id: `animal-${animalId}` },
        { type: 'ActivityLogs', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  // Medical logs
  useGetMedicalLogsByAnimalQuery,
  useCreateMedicalLogMutation,
  useUpdateMedicalLogMutation,
  useDeleteMedicalLogMutation,
  // Activity logs
  useGetActivityLogsByAnimalQuery,
  useGetAllActivityLogsQuery,
  useCreateActivityLogMutation,
  useUpdateActivityLogMutation,
  useDeleteActivityLogMutation,
} = logsApi;
