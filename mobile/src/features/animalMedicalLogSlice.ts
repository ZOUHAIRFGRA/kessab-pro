import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { 
  MedicalLog,
  MedicalLogRequest,
} from "../types/api";

interface MedicalLogState {
  medicalLogs: MedicalLog[];
  loading: boolean;
  error: string | null;
}

interface ModifyMedicalLogParams {
  logId: number;
  logData: MedicalLogRequest;
}

// Fetch medical logs
export const getAnimalMedicalLogs = createAsyncThunk<MedicalLog[], number>(
  "animalMedicalLogs/fetch",
  async (animalId: number) => {
    throw new Error("Deprecated: Use RTK Query animalMedicalLogsApi.useFetchAnimalMedicalLogsQuery instead");
  }
);

export const createAnimalMedicalLog = createAsyncThunk<MedicalLog, MedicalLogRequest>(
  "animalMedicalLogs/add",
  async (logData) => {
    throw new Error("Deprecated: Use RTK Query animalMedicalLogsApi.useCreateAnimalMedicalLogMutation instead");
  }
);

// Update existing medical log
export const modifyAnimalMedicalLog = createAsyncThunk<MedicalLog, ModifyMedicalLogParams>(
  "animalMedicalLogs/update",
  async ({ logId, logData }) => {
    throw new Error("Deprecated: Use RTK Query animalMedicalLogsApi.useUpdateAnimalMedicalLogMutation instead");
  }
);

export const deleteAnimalMedicalLog = createAsyncThunk<number, number>(
  "animalMedicalLogs/delete",
  async (logId) => {
    throw new Error("Deprecated: Use RTK Query animalMedicalLogsApi.useDeleteAnimalMedicalLogMutation instead");
  }
);

const initialState: MedicalLogState = {
  medicalLogs: [],
  loading: false,
  error: null,
};

const animalMedicalLogSlice = createSlice({
  name: "animalMedicalLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimalMedicalLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalMedicalLogs.fulfilled, (state, action: PayloadAction<MedicalLog[]>) => {
        state.loading = false;
        state.medicalLogs = action.payload;
      })
      .addCase(getAnimalMedicalLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createAnimalMedicalLog.fulfilled, (state, action: PayloadAction<MedicalLog>) => {
        state.medicalLogs.push(action.payload);
      })
      .addCase(deleteAnimalMedicalLog.fulfilled, (state, action: PayloadAction<number>) => {
        state.medicalLogs = state.medicalLogs.filter(
          (log) => log.id !== action.payload
        );
      })
      .addCase(modifyAnimalMedicalLog.fulfilled, (state, action: PayloadAction<MedicalLog>) => {
        state.medicalLogs = state.medicalLogs.map((log) =>
          log.id === action.payload.id ? action.payload : log
        );
      });
  },
});

export default animalMedicalLogSlice.reducer;
