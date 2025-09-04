import axiosInstance from "./axiosInstance";

class MarketplaceService {
    // Get all listings with filters
    async getListings(params = {}) {
        try {
            const response = await axiosInstance.get("/marketplace/listings", { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching listings:", error);
            throw error;
        }
    }

    // Get listing by ID
    async getListingById(id) {
        try {
            const response = await axiosInstance.get(`/marketplace/listings/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching listing:", error);
            throw error;
        }
    }

    // Create new listing
    async createListing(listingData) {
        try {
            const response = await axiosInstance.post("/marketplace/listings", listingData);
            return response.data;
        } catch (error) {
            console.error("Error creating listing:", error);
            throw error;
        }
    }

    // Update listing
    async updateListing(id, listingData) {
        try {
            const response = await axiosInstance.put(`/marketplace/listings/${id}`, listingData);
            return response.data;
        } catch (error) {
            console.error("Error updating listing:", error);
            throw error;
        }
    }

    // Delete listing
    async deleteListing(id) {
        try {
            const response = await axiosInstance.delete(`/marketplace/listings/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting listing:", error);
            throw error;
        }
    }

    // Get user's listings
    async getMyListings(params = {}) {
        try {
            const response = await axiosInstance.get("/marketplace/my-listings", { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching my listings:", error);
            throw error;
        }
    }

    // Get marketplace statistics
    async getMarketplaceStats() {
        try {
            const response = await axiosInstance.get("/marketplace/stats");
            return response.data;
        } catch (error) {
            console.error("Error fetching marketplace stats:", error);
            throw error;
        }
    }

    // Mark listing as sold
    async markAsSold(id) {
        try {
            const response = await axiosInstance.patch(`/marketplace/listings/${id}/sold`);
            return response.data;
        } catch (error) {
            console.error("Error marking listing as sold:", error);
            throw error;
        }
    }

    // Search listings
    async searchListings(searchTerm, filters = {}) {
        try {
            const params = { searchTerm, ...filters };
            const response = await axiosInstance.get("/marketplace/listings", { params });
            return response.data;
        } catch (error) {
            console.error("Error searching listings:", error);
            throw error;
        }
    }

    // Get listings by animal type
    async getListingsByAnimalType(animalType, params = {}) {
        try {
            const requestParams = { animalType, ...params };
            const response = await axiosInstance.get("/marketplace/listings", { params: requestParams });
            return response.data;
        } catch (error) {
            console.error("Error fetching listings by animal type:", error);
            throw error;
        }
    }

    // Get listings by price range
    async getListingsByPriceRange(minPrice, maxPrice, params = {}) {
        try {
            const requestParams = { minPrice, maxPrice, ...params };
            const response = await axiosInstance.get("/marketplace/listings", { params: requestParams });
            return response.data;
        } catch (error) {
            console.error("Error fetching listings by price range:", error);
            throw error;
        }
    }

    // Get top rated listings
    async getTopRatedListings(params = {}) {
        try {
            const requestParams = { sortBy: "rating", ...params };
            const response = await axiosInstance.get("/marketplace/listings", { params: requestParams });
            return response.data;
        } catch (error) {
            console.error("Error fetching top rated listings:", error);
            throw error;
        }
    }

    // Get recent listings
    async getRecentListings(params = {}) {
        try {
            const requestParams = { sortBy: "recent", ...params };
            const response = await axiosInstance.get("/marketplace/listings", { params: requestParams });
            return response.data;
        } catch (error) {
            console.error("Error fetching recent listings:", error);
            throw error;
        }
    }
}

export default new MarketplaceService();