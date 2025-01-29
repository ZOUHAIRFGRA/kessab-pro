import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnimals } from "../api/animalApi";


export const getAnimals = createAsyncThunk("animals/fetchAll", async () => {
  const response = await fetchAnimals();
//   console.log("Fetched animals:", response);
  return response;
});

const animalSlice = createSlice({
  name: "animals",
  initialState: {
    animals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default animalSlice.reducer;
