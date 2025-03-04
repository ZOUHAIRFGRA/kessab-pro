import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  fetchAnimalById,
  fetchAnimalsBySale,
  fetchAnimalsByBuyer,
  fetchUnsoldAnimals,
  fetchAnimalsCount,
} from "../api/animalApi";

export const getAnimalsBySale = createAsyncThunk(
  "animals/fetchAll/bySale",
  async (saleId) => {
    const response = await fetchAnimalsBySale(saleId);
    return response.data;
  }
);
export const getAnimalsByBuyer = createAsyncThunk(
  "animals/fetchAll/byBuyer",
  async (buyerId) => {
    const response = await fetchAnimalsByBuyer(buyerId);
    return response.data;
  }
);

export const getAnimals = createAsyncThunk(
  "animals/fetchAll",
  async ({ page = 0, size = 2, search = "", filterType = "tag" }) => {
    const response = await fetchAnimals(page, size, search, filterType);
    return response;
  }
);

export const getAnimalsCount = createAsyncThunk("animals/count", async () => {
  const response = await fetchAnimalsCount();
  return response.data;
});
export const getUnsoldAnimals = createAsyncThunk(
  "animals/fetchUnsold",
  async () => {
    const response = await fetchUnsoldAnimals();
    return response.data;
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
    totalAnimals: 0,
  },
  reducers: {
    resetAnimals: (state) => {
      state.animals = [];
      state.animal = null;
      state.loading = false;
      state.error = null;
      state.page = 0;
      state.totalPages = 0;
      state.totalAnimals = 0;
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
        state.totalAnimals = action.payload.page.totalElements;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch animals.";
      })

      .addCase(getAnimalsCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalsCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalAnimals = action.payload;
      })
      .addCase(getAnimalsCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch animals count.";
      })

      .addCase(getUnsoldAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUnsoldAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(getUnsoldAnimals.rejected, (state, action) => {
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
      .addCase(addAnimal.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add animal.";
      })

      .addCase(editAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(editAnimal.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update animal.";
      })

      .addCase(removeAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter((a) => a.id !== action.payload);
      })
      .addCase(removeAnimal.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete animal.";
      })

      .addCase(getAnimalsBySale.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalsBySale.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.animals = action.payload;
      })
      .addCase(getAnimalsBySale.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch animals by sale.";
      })

      .addCase(getAnimalsByBuyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalsByBuyer.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(getAnimalsByBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch animals by buyer.";
      });
  },
});

export const { resetAnimals } = animalSlice.actions;
export default animalSlice.reducer;
