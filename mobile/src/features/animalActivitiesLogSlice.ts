import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  fetchAnimalActivitiesLogs, 
  addAnimalActivitiesLog, 
  updateAnimalActivitiesLog,
  removeAnimalActivityLog,
  fetchAllAnimalActivitiesLogs,
  ActivityLog,
  ActivityLogRequest,
} from "../api/animalApi";

interface ActivityLogState {
  activitiesLogs: ActivityLog[];
  loading: boolean;
  error: string | null;
}

interface ModifyActivityLogParams {
  logId: number;
  logData: ActivityLogRequest;
}

// Fetch activity logs
export const getAnimalActivitiesLogs = createAsyncThunk<ActivityLog[], number>(
  "animalActivitiesLogs/fetch",
  async (animalId: number) => {
    const response = await fetchAnimalActivitiesLogs(animalId);
    return response;
  }
);

export const getAllAnimalActivitiesLogs = createAsyncThunk<ActivityLog[], void>(
  "animalActivitiesLogs/fetchAll",
  async () => {
    const response = await fetchAllAnimalActivitiesLogs();
    return response;
  }
);

export const createAnimalActivityLog = createAsyncThunk<ActivityLog, ActivityLogRequest>(
  "animalActivitiesLogs/add",
  async (logData) => {
    const response = await addAnimalActivitiesLog(logData);
    return response;
  }
);

// Update existing activity log
export const modifyAnimalActivityLog = createAsyncThunk<ActivityLog, ModifyActivityLogParams>(
  "animalActivitiesLogs/update",
  async ({ logId, logData }) => {
    const response = await updateAnimalActivitiesLog(logId, logData);
    return response;
  }
);

export const deleteAnimalActivityLog = createAsyncThunk<number, number>(
  "animalActivitiesLogs/delete",
  async (logId) => {
    await removeAnimalActivityLog(logId);
    return logId;
  }
);

const initialState: ActivityLogState = {
  activitiesLogs: [],
  loading: false,
  error: null,
};

const animalActivitiesLogSlice = createSlice({
  name: "animalActivitiesLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimalActivitiesLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalActivitiesLogs.fulfilled, (state, action: PayloadAction<ActivityLog[]>) => {
        state.loading = false;
        state.activitiesLogs = action.payload;
      })
      .addCase(getAnimalActivitiesLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getAllAnimalActivitiesLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAnimalActivitiesLogs.fulfilled, (state, action: PayloadAction<ActivityLog[]>) => {
        state.loading = false;
        state.activitiesLogs = action.payload;
      })
      .addCase(getAllAnimalActivitiesLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createAnimalActivityLog.fulfilled, (state, action: PayloadAction<ActivityLog>) => {
        state.activitiesLogs.push(action.payload);
      })
      .addCase(deleteAnimalActivityLog.fulfilled, (state, action: PayloadAction<number>) => {
        state.activitiesLogs = state.activitiesLogs.filter(
          (log) => log.id !== action.payload 
        );
      })
      .addCase(deleteAnimalActivityLog.rejected, (state, action) => {
        state.error = action.error.message || null;
      })
      .addCase(modifyAnimalActivityLog.fulfilled, (state, action: PayloadAction<ActivityLog>) => {
        state.activitiesLogs = state.activitiesLogs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        );
      });
  },
});

export default animalActivitiesLogSlice.reducer;
