import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type {
  Animal,
  AnimalListResponse,
  AnimalCreateRequest,
  AnimalUpdateRequest,
} from "../types/api";

// Stub functions for deprecated thunks - these should not be used, migrate to RTK Query
const fetchAnimalsBySale = async (id: number) => ({ data: [] as Animal[] });
const fetchAnimalsByBuyer = async (id: number) => ({ data: [] as Animal[] });
const fetchAnimals = async (page: number, size: number, search: string, filterType: string) => ({ content: [], totalPages: 0, totalElements: 0 } as AnimalListResponse);
const fetchAnimalsCount = async () => 0;
const fetchUnsoldAnimals = async () => [] as Animal[];
const createAnimal = async (data: FormData) => ({} as Animal);
const updateAnimal = async (id: number, data: FormData) => ({} as Animal);
const deleteAnimal = async (id: number) => {};
const fetchAnimalById = async (id: number) => ({} as Animal);

interface AnimalState {
  animals: Animal[];
  unsoldAnimals: Animal[];
  animal: Animal | null;
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalAnimals: number;
  totalUnsoldAnimals: number;
}

interface GetAnimalsParams {
  page?: number;
  size?: number;
  search?: string;
  filterType?: string;
}

interface EditAnimalParams {
  id: number;
  updatedAnimal: AnimalUpdateRequest;
}

// to check
export const getAnimalsBySale = createAsyncThunk<Animal[], number>(
  "animals/fetchAll/bySale",
  async (saleId: number) => {
    const response = await fetchAnimalsBySale(saleId);
    return response.data;
  }
);

//! to rectify
export const getAnimalsByBuyer = createAsyncThunk<Animal[], number>(
  "animals/fetchAll/byBuyer",
  async (buyerId: number) => {
    const response = await fetchAnimalsByBuyer(buyerId);
    return response.data;
  }
);

export const getAnimals = createAsyncThunk<AnimalListResponse, GetAnimalsParams>(
  "animals/fetchAll",
  async ({ page = 0, size = 10, search = "", filterType = "tag" }) => {
    const response = await fetchAnimals(page, size, search, filterType);
    return response;
  }
);

export const getAnimalsCount = createAsyncThunk<number, void>(
  "animals/count",
  async () => {
    const response = await fetchAnimalsCount();
    return response;
  }
);

export const getUnsoldAnimals = createAsyncThunk<Animal[], void>(
  "animals/fetchUnsold",
  async () => {
    const response = await fetchUnsoldAnimals();
    return response;
  }
);

export const addAnimal = createAsyncThunk<Animal, FormData>(
  "animals/add",
  async (animal) => {
    const response = await createAnimal(animal);
    return response;
  }
);

export const editAnimal = createAsyncThunk<Animal, { id: number; updatedAnimal: FormData }>(
  "animals/update",
  async ({ id, updatedAnimal }) => {
    const response = await updateAnimal(id, updatedAnimal);
    return response;
  }
);

export const removeAnimal = createAsyncThunk<number, number>(
  "animals/delete",
  async (id) => {
    await deleteAnimal(id);
    return id;
  }
);

export const getAnimalById = createAsyncThunk<Animal, number>(
  "animals/fetchById",
  async (id) => {
    const response = await fetchAnimalById(id);
    return response;
  }
);

const initialState: AnimalState = {
  animals: [],
  unsoldAnimals: [],
  animal: null,
  loading: false,
  error: null,
  page: 0,
  totalPages: 0,
  totalAnimals: 0,
  totalUnsoldAnimals: 0,
};

const animalSlice = createSlice({
  name: "animals",
  initialState,
  reducers: {
    resetAnimals: (state) => {
      state.animals = [];
      state.unsoldAnimals = [];
      state.animal = null;
      state.loading = false;
      state.error = null;
      state.page = 0;
      state.totalPages = 0;
      state.totalAnimals = 0;
      state.totalUnsoldAnimals = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimals.fulfilled, (state, action: PayloadAction<AnimalListResponse>) => {
        state.loading = false;
        state.animals = action.payload.content;
        state.page = action.payload.number;
        state.totalPages = action.payload.totalPages;
        state.totalAnimals = action.payload.totalElements;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch animals.";
      })

      .addCase(getAnimalsCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalsCount.fulfilled, (state, action: PayloadAction<number>) => {
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
      .addCase(getUnsoldAnimals.fulfilled, (state, action: PayloadAction<Animal[]>) => {
        state.loading = false;
        state.unsoldAnimals = action.payload;
        state.totalUnsoldAnimals = action.payload.length;
      })
      .addCase(getUnsoldAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch unsold animals.";
      })

      .addCase(getAnimalById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalById.fulfilled, (state, action: PayloadAction<Animal>) => {
        state.loading = false;
        state.animal = action.payload;
      })
      .addCase(getAnimalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch animal details.";
      })

      .addCase(addAnimal.fulfilled, (state, action: PayloadAction<Animal>) => {
        state.animals.push(action.payload);
      })
      .addCase(addAnimal.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add animal.";
      })

      .addCase(editAnimal.fulfilled, (state, action: PayloadAction<Animal>) => {
        state.animals = state.animals.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(editAnimal.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update animal.";
      })

      .addCase(removeAnimal.fulfilled, (state, action: PayloadAction<number>) => {
        state.animals = state.animals.filter((a) => a.id !== action.payload);
      })
      .addCase(removeAnimal.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete animal.";
      })

      .addCase(getAnimalsBySale.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimalsBySale.fulfilled, (state, action: PayloadAction<Animal[]>) => {
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
      .addCase(getAnimalsByBuyer.fulfilled, (state, action: PayloadAction<Animal[]>) => {
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
