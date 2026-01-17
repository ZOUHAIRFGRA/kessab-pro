import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import SaleService, {
  Sale,
  SaleListResponse,
  SaleCreateRequest,
  SaleUpdateRequest,
  SaleQuery,
} from "../api/saleApi";

interface SaleState {
  sales: Sale[];
  sale: Sale | null;
  loading: boolean;
  saleLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

interface EditSaleParams {
  id: number;
  updatedSale: SaleUpdateRequest;
}

export const getSales = createAsyncThunk<SaleListResponse, SaleQuery | undefined>(
  "sales/fetchAll",
  async (params) => {
    const response = await SaleService.fetchSales(params);
    return response;
  }
);

export const getSalesByBuyerId = createAsyncThunk<Sale[], number>(
  "sales/fetchAllBybuyer",
  async (buyerId) => {
    const response = await SaleService.fetchSalesByBuyerId(buyerId);
    return response;
  }
);

export const getSale = createAsyncThunk<Sale, number>(
  "sales/get",
  async (id) => {
    const response = await SaleService.fetchSaleById(id);
    return response;
  }
);

export const addSale = createAsyncThunk<Sale, SaleCreateRequest>(
  "sales/add",
  async (sale) => {
    const response = await SaleService.createSale(sale);
    return response;
  }
);

export const editSale = createAsyncThunk<Sale, EditSaleParams>(
  "sales/update",
  async ({ id, updatedSale }) => {
    const response = await SaleService.updateSale(id, updatedSale);
    return response;
  }
);

export const removeSale = createAsyncThunk<number, number>(
  "sales/delete",
  async (id) => {
    await SaleService.deleteSale(id);
    return id;
  }
);

export const exportSaleInvoice = async (id: number): Promise<void> => {
  try {
    const response = await SaleService.fetchSaleInvoice(id);
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

const initialState: SaleState = {
  sales: [],
  sale: null,
  loading: false,
  saleLoading: false,
  error: null,
  page: 0,
  totalPages: 0,
};

const saleSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    resetSales: (state) => {
      state.error = null;
      state.sales = [];
      state.loading = false;
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
      .addCase(getSales.fulfilled, (state, action: PayloadAction<SaleListResponse>) => {
        state.sales = action.payload.content;
        state.loading = false;
        state.totalPages = action.payload.totalPages;
        state.error = null;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getSalesByBuyerId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSalesByBuyerId.fulfilled, (state, action: PayloadAction<Sale[]>) => {
        state.loading = false;
        state.error = null;
        state.sales = action.payload;
      })
      .addCase(getSalesByBuyerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getSale.rejected, (state, action) => {
        state.saleLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getSale.pending, (state) => {
        state.saleLoading = true;
      })
      .addCase(getSale.fulfilled, (state, action: PayloadAction<Sale>) => {
        state.saleLoading = false;
        state.error = null;
        state.sale = action.payload;
      })
      .addCase(addSale.fulfilled, (state, action: PayloadAction<Sale>) => {
        state.sales.push(action.payload);
      })
      .addCase(editSale.fulfilled, (state, action: PayloadAction<Sale>) => {
        state.sales = state.sales.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(removeSale.fulfilled, (state, action: PayloadAction<number>) => {
        state.sales = state.sales.filter((s) => s.id !== action.payload);
      });
  },
});

export const { resetSales, resetSale } = saleSlice.actions;
export default saleSlice.reducer;
