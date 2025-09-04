import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import marketplaceApi from "../api/marketplaceApi";

// Async thunks
export const fetchListings = createAsyncThunk(
  "marketplace/fetchListings",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getListings(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch listings");
    }
  }
);

export const fetchListingById = createAsyncThunk(
  "marketplace/fetchListingById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getListingById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch listing");
    }
  }
);

export const createListing = createAsyncThunk(
  "marketplace/createListing",
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.createListing(listingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create listing");
    }
  }
);

export const updateListing = createAsyncThunk(
  "marketplace/updateListing",
  async ({ id, listingData }, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.updateListing(id, listingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update listing");
    }
  }
);

export const deleteListing = createAsyncThunk(
  "marketplace/deleteListing",
  async (id, { rejectWithValue }) => {
    try {
      await marketplaceApi.deleteListing(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete listing");
    }
  }
);

export const fetchMyListings = createAsyncThunk(
  "marketplace/fetchMyListings",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getMyListings(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch my listings");
    }
  }
);

export const markAsSold = createAsyncThunk(
  "marketplace/markAsSold",
  async (id, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.markAsSold(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to mark as sold");
    }
  }
);

export const searchListings = createAsyncThunk(
  "marketplace/searchListings",
  async ({ searchTerm, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.searchListings(searchTerm, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to search listings");
    }
  }
);

export const fetchMarketplaceStats = createAsyncThunk(
  "marketplace/fetchMarketplaceStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getMarketplaceStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch marketplace stats");
    }
  }
);

const initialState = {
  listings: [],
  myListings: [],
  currentListing: null,
  stats: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
  },
  filters: {
    animalType: "",
    searchTerm: "",
    minPrice: null,
    maxPrice: null,
    sortBy: "",
  },
};

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentListing: (state) => {
      state.currentListing = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        animalType: "",
        searchTerm: "",
        minPrice: null,
        maxPrice: null,
        sortBy: "",
      };
    },
    resetListings: (state) => {
      state.listings = [];
      state.pagination = {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch listings
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.listings;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        };
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch listing by ID
    builder
      .addCase(fetchListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentListing = action.payload;
      })
      .addCase(fetchListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create listing
    builder
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings.unshift(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update listing
    builder
      .addCase(updateListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.listings.findIndex(
          (listing) => listing.id === action.payload.id
        );
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
        if (state.currentListing?.id === action.payload.id) {
          state.currentListing = action.payload;
        }
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete listing
    builder
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = state.listings.filter(
          (listing) => listing.id !== action.payload
        );
        if (state.currentListing?.id === action.payload) {
          state.currentListing = null;
        }
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch my listings
    builder
      .addCase(fetchMyListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.loading = false;
        state.myListings = action.payload.content;
      })
      .addCase(fetchMyListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Mark as sold
    builder
      .addCase(markAsSold.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsSold.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.listings.findIndex(
          (listing) => listing.id === action.payload.id
        );
        if (index !== -1) {
          state.listings[index] = action.payload;
        }
        if (state.currentListing?.id === action.payload.id) {
          state.currentListing = action.payload;
        }
      })
      .addCase(markAsSold.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Search listings
    builder
      .addCase(searchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.listings;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        };
      })
      .addCase(searchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch marketplace stats
    builder
      .addCase(fetchMarketplaceStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketplaceStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchMarketplaceStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentListing,
  setFilters,
  clearFilters,
  resetListings,
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer; 