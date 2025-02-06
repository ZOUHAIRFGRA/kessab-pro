import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  fetchAnimalMedicalLogs, 
  addAnimalMedicalLog, 
  updateAnimalMedicalLog 
} from "../api/animalApi";

// Fetch medical logs
export const getAnimalMedicalLogs = createAsyncThunk(
  "animalMedicalLogs/fetch",
  async (animalId) => {
    const response = await fetchAnimalMedicalLogs(animalId);
    return response;
  }
);

// Add new medical log
export const createAnimalMedicalLog = createAsyncThunk(
  "animalMedicalLogs/add",
  async ({ animalId, logData }) => {
    const response = await addAnimalMedicalLog(animalId, logData);
    return response;
  }
);

// Update existing medical log
export const modifyAnimalMedicalLog = createAsyncThunk(
  "animalMedicalLogs/update",
  async ({ logId, logData }) => {
    const response = await updateAnimalMedicalLog(logId, logData);
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
      })
      .addCase(createAnimalMedicalLog.fulfilled, (state, action) => {
        state.medicalLogs.push(action.payload);
      })
      .addCase(modifyAnimalMedicalLog.fulfilled, (state, action) => {
        state.medicalLogs = state.medicalLogs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        );
      });
  },
});

export default animalMedicalLogSlice.reducer;
