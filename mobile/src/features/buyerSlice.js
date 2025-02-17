import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  BuyersService  from "../api/buyerApi";


export const getBuyers = createAsyncThunk("buyers/fetchAll", async () => {
  const response = await BuyersService.fetchBuyers();
  return response;
});


export const getBuyer = createAsyncThunk("buyers/get", async (id) => {
  const response = await BuyersService.fetchBuyerById(id);
  return response;
});


export const addBuyer = createAsyncThunk("buyers/add", async (buyer) => {
  const response = await BuyersService.createBuyer(buyer);
  return response;
});


export const editBuyer = createAsyncThunk("buyers/update", async ({ id, updateBuyer }) => {
  const response = await BuyersService.updateBuyer(id, updateBuyer);
  return response;
});


export const removeBuyer = createAsyncThunk("buyers/delete", async (id) => {
  await BuyersService.deleteBuyer(id);
  return id; 
});

const buyerSlice = createSlice({
  name: "buyers",
  initialState: {
    buyers: [],
    buyer: null,  
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBuyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBuyers.fulfilled, (state, action) => {
        state.loading = false;
        state.buyers = action.payload;
      })
      .addCase(getBuyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBuyer.fulfilled, (state, action) => {
        state.loading = false;
        state.buyer = action.payload;
        console.log({buyer : action.payload});
        
      })
      .addCase(addBuyer.fulfilled, (state, action) => {
        state.buyers.push(action.payload);
      })
      .addCase(editBuyer.fulfilled, (state, action) => {
        state.buyers = state.buyers.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(removeBuyer.fulfilled, (state, action) => {
        state.buyers = state.buyers.filter((s) => s.id !== action.payload);
      });
  },
});

export default buyerSlice.reducer;
