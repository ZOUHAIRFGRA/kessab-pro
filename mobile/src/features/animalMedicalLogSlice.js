import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnimalMedicalLogs } from "../api/animalApi";

export const getAnimalMedicalLogs = createAsyncThunk(
  "animalMedicalLogs/fetch",
  async (animalId) => {
    const response = await fetchAnimalMedicalLogs(animalId);
    // console.log(response);
    
    return response;
  }
);

const animalMedicalLogSlice = createSlice({
  name: "animalMedicalLogs",
  initialState: {
    medicalLogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimalMedicalLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalMedicalLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.medicalLogs = action.payload;
      })
      .addCase(getAnimalMedicalLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default animalMedicalLogSlice.reducer;
