import { api } from '../api';
import { User, UserUpdateRequest } from '../../types/api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getUserProfile: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
      keepUnusedDataFor: 600, // 10 minutes
    }),

    // Update user profile
    updateUserProfile: builder.mutation<User, UserUpdateRequest>({
      query: (updatedUser) => ({
        url: '/users/update',
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['User'],
      // Optimistic update
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUserProfile', undefined, (draft) => {
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
  }),
  overrideExisting: false,
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = usersApi;
