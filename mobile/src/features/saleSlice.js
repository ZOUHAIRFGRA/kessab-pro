import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import saleApi, { createSale, updateSale, deleteSale } from "../api/saleApi";
import SaleService from "../api/saleApi";

export const getSales = createAsyncThunk("sales/fetchAll", async (params) => {
  const response = await SaleService.fetchSales(params);
  return response;
});
export const getSalesByBuyerId = createAsyncThunk(
  "sales/fetchAllBybuyer",
  async (buyerId) => {
    const response = await SaleService.fetchSalesByBuyerId(buyerId);
    return response;
  }
);

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

export const exportSaleInvoice = async (id) => {
  try {
    const response = await saleApi.fetchSaleInvoice(id);
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

const saleSlice = createSlice({
  name: "sales",
  initialState: {
    sales: [],
    sale: null,
    loading: false,
    saleLoading: false,
    error: null,
    page: 0,
    totalPages: 0,
  },
  reducers: {
    resetSales: (state) => {
      state.error = null;
      state.sales = null;
      state.loading = false;
      state.page = 0;
      state.totalPages = 0;
    },
    resetSale: (state) => {
      state.error = null;
      state.sale = null;
      state.saleLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        const { content, totalPages, page } = action.payload;
        state.sales = content;
        state.loading = false;
        state.totalPages = totalPages;
        state.page = page + 1;
        state.error = null;
        console.log("fullied");
      })
      .addCase(getSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSalesByBuyerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSalesByBuyerId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.sales = action.payload;
      })
      .addCase(getSalesByBuyerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSale.rejected, (state, action) => {
        state.saleLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSale.pending, (state) => {
        state.saleLoading = true;
      })
      .addCase(getSale.fulfilled, (state, action) => {
        state.saleLoading = false;
        state.error = null;
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

export const { resetSales, resetSale } = saleSlice.actions;

export default saleSlice.reducer;
