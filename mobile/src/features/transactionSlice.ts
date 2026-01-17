import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import TransactionService, {
  Transaction,
  TransactionCreateRequest,
  TransactionUpdateRequest,
} from "../api/transactionApi";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

interface EditTransactionParams {
  id: number;
  updatedTransaction: TransactionUpdateRequest;
}

// Async thunks
export const getTransactions = createAsyncThunk<Transaction[], void>(
  "transactions/fetchAll",
  async () => {
    const response = await TransactionService.fetchTransactions();
    return response;
  }
);

export const getTransactionsBySale = createAsyncThunk<Transaction[], number>(
  "transactions/fetchBySale",
  async (saleId) => {
    return await TransactionService.fetchTransactionsBySale(saleId);
  }
);

export const getTransactionsByBuyer = createAsyncThunk<Transaction[], number>(
  "transactions/fetchByBuyer",
  async (buyerId) => {
    return await TransactionService.fetchTransactionsByBuyer(buyerId);
  }
);

export const exportTransactionInvoice = async (id: number): Promise<void> => {
  try {
    const response = await TransactionService.fetchTransactionInvoice(id);
    const { filename, pdfBase64 } = response as any;
    const filepath = `${(FileSystem as any).documentDirectory}${filename}`;
    await (FileSystem as any).writeAsStringAsync(filepath, pdfBase64, {
      encoding: (FileSystem as any).EncodingType.Base64,
    });
    await Sharing.shareAsync(filepath, { mimeType: "application/pdf" });
  } catch (e: any) {
    alert(e.message);
  }
};

export const addTransaction = createAsyncThunk<Transaction, TransactionCreateRequest>(
  "transactions/add",
  async (transaction) => {
    const response = await TransactionService.createTransaction(transaction);
    return response;
  }
);

export const editTransaction = createAsyncThunk<Transaction, EditTransactionParams>(
  "transactions/update",
  async ({ id, updatedTransaction }) => {
    const response = await TransactionService.updateTransaction(
      id,
      updatedTransaction
    );
    return response;
  }
);

export const removeTransaction = createAsyncThunk<number, number>(
  "transactions/delete",
  async (id) => {
    await TransactionService.deleteTransaction(id);
    return id;
  }
);

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
};

// Slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getTransactionsBySale.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsBySale.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsBySale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getTransactionsByBuyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsByBuyer.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsByBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(editTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.transactions = state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      })
      .addCase(removeTransaction.fulfilled, (state, action: PayloadAction<number>) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default transactionSlice.reducer;
