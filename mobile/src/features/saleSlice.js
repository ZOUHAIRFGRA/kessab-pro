import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSales,
  createSale,
  updateSale,
  deleteSale,
  fetchSaleById,
} from "../api/saleApi";
import SaleService from "../api/saleApi";

export const getSales = createAsyncThunk("sales/fetchAll", async () => {
  const response = await SaleService.fetchSales();
  return response;
});

export const getSale = createAsyncThunk("sales/get", async (id) => {
  const response = await SaleService.fetchSaleById(id);
  return response;
});


export const addSale = createAsyncThunk("sales/add", async (sale) => {
  const response = await createSale(sale);
  return response;
});

export const editSale = createAsyncThunk(
  "sales/update",
  async ({ id, updatedSale }) => {
    const response = await updateSale(id, updatedSale);
    return response;
  }
);

export const removeSale = createAsyncThunk("sales/delete", async (id) => {
  await deleteSale(id);
  return id;
});

const saleSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
    sale: null,
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload.content;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sale = action.payload;
      })
      .addCase(addSale.fulfilled, (state, action) => {
        state.sales.push(action.payload);
      })
      .addCase(editSale.fulfilled, (state, action) => {
        state.sales = state.sales.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(removeSale.fulfilled, (state, action) => {
        state.sales = state.sales.filter((s) => s.id !== action.payload);
      });
  },
});

export default saleSlice.reducer;
