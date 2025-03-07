import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BuyersService from "../api/buyerApi";

export const getBuyers = createAsyncThunk(
  "buyers/fetchAll",
  async ({ q, page } = { q: "", page: 0 }) => {
    const response = await BuyersService.fetchBuyers({
      fullName: q,
      cin: q,
      page,
    });
    return response;
  }
);

export const getBuyer = createAsyncThunk("buyers/get", async (id) => {
  const response = await BuyersService.fetchBuyerById(id);
  return response;
});
export const getBuyerOverview = createAsyncThunk(
  "buyers/getOverview",
  async (id) => {
    const response = await BuyersService.fetchBuyerOverview(id);
    return response;
  }
);

export const addBuyer = createAsyncThunk("buyers/add", async (buyer) => {
  const response = await BuyersService.createBuyer(buyer);
  return response;
});

export const updateBuyer = createAsyncThunk(
  "buyers/update",
  async ({ id, buyer }) => {
    const response = await BuyersService.updateBuyer(id, buyer);
    return response;
  }
);

export const removeBuyer = createAsyncThunk("buyers/delete", async (id) => {
  await BuyersService.deleteBuyer(id);
  return id;
});

const buyerSlice = createSlice({
  name: "buyers",
  initialState: {
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
  },
  reducers: {
    resetBuyers: (state) => {
      state.error = null;
      state.buyers = null;
      state.loading = false;
      state.page = 0;
      state.totalPages = 0;
    },

    resetBuyer: (state) => {
      state.error = null;
      state.buyer = null;
      state.buyerLoading = false;
      totalPaid = 0;
      totalToPay = 0;
      totalAnimals = 0;
      animalsNotPickedUp = 0;
      animalsPickedUp = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBuyers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.buyers = action.payload.content;

        state.page = action.payload.page.number;
        state.totalPages = action.payload.page.totalPages;
      })
      .addCase(getBuyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBuyer.pending, (state, action) => {
        state.buyerLoading = true;
      })
      .addCase(getBuyer.rejected, (state, action) => {
        state.buyerLoading = false;
        state.error = action.error.message;
      })
      .addCase(getBuyer.fulfilled, (state, action) => {
        state.buyerLoading = false;
        state.error = null;
        state.buyer = action.payload;
      })
      .addCase(getBuyerOverview.pending, (state, action) => {
        state.buyerLoading = true;
      })
      .addCase(getBuyerOverview.rejected, (state, action) => {
        state.buyerLoading = false;
        state.error = action.error.message;
      })
      .addCase(getBuyerOverview.fulfilled, (state, action) => {
        state.buyerLoading = false;
        state.error = null;
        state.buyer = action.payload.buyer;
        state.totalPaid = action.payload.totalPaid;
        state.totalToPay = action.payload.totalToPay;
        state.totalAnimals = action.payload.totalAnimals;
        state.animalsNotPickedUp = action.payload.animalsNotPickedUp;
        state.animalsPickedUp = action.payload.animalsPickedUp;
      })
      .addCase(addBuyer.fulfilled, (state, action) => {
        state.buyers.push(action.payload);
      })
      .addCase(updateBuyer.rejected, (state, action) => {
      })
      .addCase(updateBuyer.fulfilled, (state, action) => {
        state.buyers = state.buyers.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(removeBuyer.fulfilled, (state, action) => {
        state.buyers = state.buyers.filter((s) => s.id !== action.payload);
      });
  },
});

export const { resetBuyer, resetBuyers } = buyerSlice.actions;

export default buyerSlice.reducer;
