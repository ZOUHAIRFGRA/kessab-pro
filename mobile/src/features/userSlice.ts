import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { User, UpdateUserRequest } from "../types/api";

interface UserProfile {
  [key: string]: any;
}

interface UserState {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const fetchUserProfile = createAsyncThunk<UserProfile, void>(
  "user/fetchProfile",
  async () => {
    throw new Error("Deprecated: Use RTK Query userApi.useFetchUserProfileQuery instead");
  }
);

export const updateProfile = createAsyncThunk<UserProfile, Partial<UserProfile>>(
  "user/updateProfile",
  async (updatedUser) => {
    throw new Error("Deprecated: Use RTK Query userApi.useUpdateUserProfileMutation instead");
  }
);

const initialState: UserState = {
  userProfile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default userSlice.reducer;
