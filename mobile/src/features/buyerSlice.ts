import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import BuyersService, {
  Buyer,
  BuyerListResponse,
  BuyerOverview,
  BuyerCreateRequest,
  BuyerUpdateRequest,
  BuyerQuery,
} from "../api/buyerApi";

interface BuyerState {
  buyers: Buyer[];
  buyer: Buyer | null;
  buyerLoading: boolean | null;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalPaid: number;
  totalToPay: number;
  totalAnimals: number;
  animalsNotPickedUp: number;
  animalsPickedUp: number;
}

interface GetBuyersParams {
  q?: string;
  page?: number;
}

interface UpdateBuyerParams {
  id: number;
  buyer: BuyerUpdateRequest;
}

export const getBuyers = createAsyncThunk<BuyerListResponse, GetBuyersParams | undefined>(
  "buyers/fetchAll",
  async (params) => {
    const q = params?.q || "";
    const page = params?.page || 0;
    const query: BuyerQuery = {
      search: q,
      page,
    };
    const response = await BuyersService.fetchBuyers(query);
    return response;
  }
);

export const getBuyer = createAsyncThunk<Buyer, number>(
  "buyers/get",
  async (id) => {
    const response = await BuyersService.fetchBuyerById(id);
    return response;
  }
);

export const getBuyerOverview = createAsyncThunk<BuyerOverview, number>(
  "buyers/getOverview",
  async (id) => {
    const response = await BuyersService.fetchBuyerOverview(id);
    return response;
  }
);

export const addBuyer = createAsyncThunk<Buyer, BuyerCreateRequest>(
  "buyers/add",
  async (buyer) => {
    const response = await BuyersService.createBuyer(buyer);
    return response;
  }
);

export const updateBuyer = createAsyncThunk<Buyer, UpdateBuyerParams>(
  "buyers/update",
  async ({ id, buyer }) => {
    const response = await BuyersService.updateBuyer(id, buyer);
    return response;
  }
);

export const removeBuyer = createAsyncThunk<number, number>(
  "buyers/delete",
  async (id) => {
    await BuyersService.deleteBuyer(id);
    return id;
  }
);

const initialState: BuyerState = {
  buyers: [],
  buyer: null,
  buyerLoading: null,
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
  totalPaid: 0,
  totalToPay: 0,
  totalAnimals: 0,
  animalsNotPickedUp: 0,
  animalsPickedUp: 0,
};

const buyerSlice = createSlice({
  name: "buyers",
  initialState,
  reducers: {
    resetBuyers: (state) => {
      state.error = null;
      state.buyers = [];
      state.loading = false;
      state.page = 0;
      state.totalPages = 0;
    },
    resetBuyer: (state) => {
      state.error = null;
      state.buyer = null;
      state.buyerLoading = false;
      state.totalPaid = 0;
      state.totalToPay = 0;
      state.totalAnimals = 0;
      state.animalsNotPickedUp = 0;
      state.animalsPickedUp = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBuyers.fulfilled, (state, action: PayloadAction<BuyerListResponse>) => {
        state.loading = false;
        state.error = null;
        state.buyers = action.payload.content;
        state.page = action.payload.number;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getBuyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getBuyer.pending, (state) => {
        state.buyerLoading = true;
      })
      .addCase(getBuyer.rejected, (state, action) => {
        state.buyerLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getBuyer.fulfilled, (state, action: PayloadAction<Buyer>) => {
        state.buyerLoading = false;
        state.error = null;
        state.buyer = action.payload;
      })
      .addCase(getBuyerOverview.pending, (state) => {
        state.buyerLoading = true;
      })
      .addCase(getBuyerOverview.rejected, (state, action) => {
        state.buyerLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getBuyerOverview.fulfilled, (state, action: PayloadAction<BuyerOverview>) => {
        state.buyerLoading = false;
        state.error = null;
        state.buyer = action.payload.buyer;
        // Map fields if they exist in the payload
        state.totalPaid = (action.payload as any).totalPaid || 0;
        state.totalToPay = (action.payload as any).totalToPay || 0;
        state.totalAnimals = (action.payload as any).totalAnimals || 0;
        state.animalsNotPickedUp = (action.payload as any).animalsNotPickedUp || 0;
        state.animalsPickedUp = (action.payload as any).animalsPickedUp || 0;
      })
      .addCase(addBuyer.fulfilled, (state, action: PayloadAction<Buyer>) => {
        state.buyers.push(action.payload);
      })
      .addCase(updateBuyer.rejected, (state) => {
        // Error handling can be added here if needed
      })
      .addCase(updateBuyer.fulfilled, (state, action: PayloadAction<Buyer>) => {
        state.buyers = state.buyers.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(removeBuyer.fulfilled, (state, action: PayloadAction<number>) => {
        state.buyers = state.buyers.filter((s) => s.id !== action.payload);
      });
  },
});

export const { resetBuyer, resetBuyers } = buyerSlice.actions;
export default buyerSlice.reducer;
