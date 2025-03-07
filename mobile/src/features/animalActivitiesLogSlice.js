import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  fetchAnimalActivitiesLogs, 
  addAnimalActivitiesLog, 
  updateAnimalActivitiesLog,
  removeAnimalActivityLog,
  fetchAllAnimalActivitiesLogs
} from "../api/animalApi";

// Fetch activity logs
export const getAnimalActivitiesLogs = createAsyncThunk(
  "animalActivitiesLogs/fetch",
  async (animalId) => {
    const response = await fetchAnimalActivitiesLogs(animalId);
    return response;
  }
);

export const getAllAnimalActivitiesLogs = createAsyncThunk(
  "animalActivitiesLogs/fetchAll",
  async () => {
    const response = await fetchAllAnimalActivitiesLogs();
    return response;
  }
);

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
      .addCase(getAllAnimalActivitiesLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAnimalActivitiesLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.activitiesLogs = action.payload;
      })
      .addCase(getAllAnimalActivitiesLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAnimalActivityLog.fulfilled, (state, action) => {
        state.activitiesLogs.push(action.payload);
      })
      .addCase(deleteAnimalActivityLog.fulfilled, (state, action) => {
        state.activitiesLogs = state.activitiesLogs.filter(
          (log) => log.id !== action.payload 
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
