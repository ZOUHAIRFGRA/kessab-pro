import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TransactionService from "../api/transactionApi";
import transactionApi from "../api/transactionApi";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
// Async thunks
export const getTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    const response = await TransactionService.fetchTransactions();
    return response;
  }
);

export const getTransactionsBySale = createAsyncThunk(
  "transactions/fetchBySale",
  async (saleId) => {
    return await TransactionService.fetchTransactionsBySale(saleId);
  }
);

export const getTransactionsByBuyer = createAsyncThunk(
  "transactions/fetchByBuyer",
  async (buyerId) => {
    return await TransactionService.fetchTransactionsByBuyer(buyerId);
  }
);

export const exportTransactionInvoice = async (id) => {
  try {
    const response = await transactionApi.fetchTransactionInvoice(id);
    const { filename, pdfBase64 } = response;
    let filepath = `${FileSystem.documentDirectory}/${filename}`;
    await FileSystem.writeAsStringAsync(filepath, pdfBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await Sharing.shareAsync(filepath, { mimeType: "application/pdf" });
  } catch (e) {
    alert(e.message);
  }
};

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (transaction) => {
    const response = await TransactionService.createTransaction(transaction);
    return response;
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/update",
  async ({ id, updatedTransaction }) => {
    const response = await TransactionService.updateTransaction(
      id,
      updatedTransaction
    );
    return response;
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/delete",
  async (id) => {
    await TransactionService.deleteTransaction(id);
    return id;
  }
);

// Slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTransactionsBySale.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsBySale.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsBySale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTransactionsByBuyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionsByBuyer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsByBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(editTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default transactionSlice.reducer;
