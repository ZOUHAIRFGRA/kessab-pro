import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile, updateUserProfile } from "../api/userApi";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async () => {
    const response = await getUserProfile();
    return response;
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedUser) => {
    const response = await updateUserProfile(updatedUser);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
