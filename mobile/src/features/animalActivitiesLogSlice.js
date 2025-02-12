import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  fetchAnimalActivitiesLogs, 
  addAnimalActivitiesLog, 
  updateAnimalActivitiesLog,
  removeAnimalActivityLog
} from "../api/animalApi";

// Fetch activity logs
export const getAnimalActivitiesLogs = createAsyncThunk(
  "animalActivitiesLogs/fetch",
  async (animalId) => {
    const response = await fetchAnimalActivitiesLogs(animalId);
    return response;
  }
);

// Add new activity log
export const createAnimalActivityLog = createAsyncThunk(
  "animalActivitiesLogs/add",
  async (logData) => {
    const response = await addAnimalActivitiesLog(logData);
    return response;
  }
);

// Update existing activity log
export const modifyAnimalActivityLog = createAsyncThunk(
  "animalActivitiesLogs/update",
  async ({ logId, logData }) => {
    const response = await updateAnimalActivitiesLog(logId, logData);
    return response;
  }
);

export const deleteAnimalActivityLog = createAsyncThunk(
  "animalActivitiesLogs/delete",
  async (logId) => {
    await removeAnimalActivityLog(logId);
    return logId;
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
      })
      .addCase(createAnimalActivityLog.fulfilled, (state, action) => {
        state.activitiesLogs.push(action.payload);
      })
      .addCase(deleteAnimalActivityLog.fulfilled, (state, action) => {
        console.log('Delete action payload.id:', action.payload.id); // Log to see what's inside
        // Assuming action.payload is just the logId
        state.activitiesLogs = state.activitiesLogs.filter(
          (log) => log.id !== action.payload // if the payload contains the log object, use action.payload.id
        );
      })
      
      .addCase(deleteAnimalActivityLog.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(modifyAnimalActivityLog.fulfilled, (state, action) => {
        state.activitiesLogs = state.activitiesLogs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        );
      });
  },
});

export default animalActivitiesLogSlice.reducer;
