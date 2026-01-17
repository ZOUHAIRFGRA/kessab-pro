import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { 
  ActivityLog,
  ActivityLogRequest,
} from "../types/api";

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
    throw new Error("Deprecated: Use RTK Query animalActivitiesLogsApi.useFetchAnimalActivitiesLogsQuery instead");
  }
);

export const getAllAnimalActivitiesLogs = createAsyncThunk<ActivityLog[], void>(
  "animalActivitiesLogs/fetchAll",
  async () => {
    throw new Error("Deprecated: Use RTK Query animalActivitiesLogsApi.useFetchAllAnimalActivitiesLogsQuery instead");
  }
);

export const createAnimalActivityLog = createAsyncThunk<ActivityLog, ActivityLogRequest>(
  "animalActivitiesLogs/add",
  async (logData) => {
    throw new Error("Deprecated: Use RTK Query animalActivitiesLogsApi.useCreateAnimalActivityLogMutation instead");
  }
);

// Update existing activity log
export const modifyAnimalActivityLog = createAsyncThunk<ActivityLog, ModifyActivityLogParams>(
  "animalActivitiesLogs/update",
  async ({ logId, logData }) => {
    throw new Error("Deprecated: Use RTK Query animalActivitiesLogsApi.useUpdateAnimalActivityLogMutation instead");
  }
);

export const deleteAnimalActivityLog = createAsyncThunk<number, number>(
  "animalActivitiesLogs/delete",
  async (logId) => {
    throw new Error("Deprecated: Use RTK Query animalActivitiesLogsApi.useDeleteAnimalActivityLogMutation instead");
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
