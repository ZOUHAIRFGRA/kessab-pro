import axiosInstance from "./axiosInstance";

class BuyersService {
  fetchBuyers() {
    return axiosInstance.get("/buyers").then((res) => res.data);
  }

  fetchBuyerById(id) {
    return axiosInstance.get(`/buyers/${id}`).then((res) => res.data);
  }

  createBuyer(payload) {
    return axiosInstance.post("/buyers", payload).then((res) => res.data);
  }

  updateBuyer(id, buyer) {
    return axiosInstance.put(`/buyers/${id}`, buyer).then((res) => res.data);
  }

  deleteBuyer(id) {
    return axiosInstance.delete(`/buyers/${id}`).then((res) => res.data);
  }
}

export default new BuyersService();
