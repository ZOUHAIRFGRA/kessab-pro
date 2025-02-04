import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTransactions, createTransaction, updateTransaction, deleteTransaction } from "../api/transactionApi";


export const getTransactions = createAsyncThunk("transactions/fetchAll", async () => {
  const response = await fetchTransactions();
  return response;
});


export const addTransaction = createAsyncThunk("transactions/add", async (transaction) => {
  const response = await createTransaction(transaction);
  return response;
});


export const editTransaction = createAsyncThunk("transactions/update", async ({ id, updatedTransaction }) => {
  const response = await updateTransaction(id, updatedTransaction);
  // console.log("Edit Response:", response);
  return response;
});


export const removeTransaction = createAsyncThunk("transactions/delete", async (id) => {
  await deleteTransaction(id);
  return id; 
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })

      
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      })

      
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;
