import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnimals, createAnimal, updateAnimal, deleteAnimal } from "../api/animalApi";


export const getAnimals = createAsyncThunk("animals/fetchAll", async () => {
  const response = await fetchAnimals();
  return response;
});


export const addAnimal = createAsyncThunk("animals/add", async (animal) => {
  const response = await createAnimal(animal);
  return response;
});


export const editAnimal = createAsyncThunk("animals/update", async ({ id, updatedAnimal }) => {
  const response = await updateAnimal(id, updatedAnimal);
  return response;
});


export const removeAnimal = createAsyncThunk("animals/delete", async (id) => {
  await deleteAnimal(id);
  return id; 
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
      })

      
      .addCase(addAnimal.fulfilled, (state, action) => {
        state.animals.push(action.payload);
      })

      
      .addCase(editAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })

      
      .addCase(removeAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter((a) => a.id !== action.payload);
      });
  },
});

export default animalSlice.reducer;
