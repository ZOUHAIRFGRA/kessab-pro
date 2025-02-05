import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnimalActivitiesLogs } from "../api/animalApi";

export const getAnimalActivitiesLogs = createAsyncThunk(
  "animalActivitiesLogs/fetch",
  async (animalId) => {
    const response = await fetchAnimalActivitiesLogs(animalId);
    return response;
  }
);

const animalActivitiesLogSlice = createSlice({
  name: "animalActivitiesLogs",
  initialState: {
    activitiesLogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimalActivitiesLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalActivitiesLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.activitiesLogs = action.payload;
      })
      .addCase(getAnimalActivitiesLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default animalActivitiesLogSlice.reducer;
