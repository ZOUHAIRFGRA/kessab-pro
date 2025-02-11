import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  fetchAnimalById
} from "../api/animalApi";


export const getAnimals = createAsyncThunk(
  "animals/fetchAll",
  async ({ page = 0, size = 2, search = "", filterType = "tag" }) => {
    const response = await fetchAnimals(page, size, search, filterType);
    return response;
  }
);

export const addAnimal = createAsyncThunk("animals/add", async (animal) => {
  const response = await createAnimal(animal);
  return response;
});

export const editAnimal = createAsyncThunk(
  "animals/update",
  async ({ id, updatedAnimal }) => {
    const response = await updateAnimal(id, updatedAnimal);
    return response;
  }
);

export const removeAnimal = createAsyncThunk("animals/delete", async (id) => {
  await deleteAnimal(id);
  return id;
});


export const getAnimalById = createAsyncThunk(
  "animals/fetchById",
  async (id) => {
    const response = await fetchAnimalById(id); 
    return response;
  }
);

const animalSlice = createSlice({
  name: "animals",
  initialState: {
    animals: [],
    animal: null,  
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,
  },
  reducers: {
    resetAnimals: (state) => {
      state.animals = [];
      state.animal = null;  
      state.loading = false;
      state.error = null;
      state.page = 0;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload.content;
        state.page = action.payload.page.number;
        state.totalPages = action.payload.page.totalPages;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch animals.";
      })

      
      .addCase(getAnimalById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalById.fulfilled, (state, action) => {
        state.loading = false;
        state.animal = action.payload;  
      })
      .addCase(getAnimalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch animal details.";
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

export const { resetAnimals } = animalSlice.actions;
export default animalSlice.reducer;

