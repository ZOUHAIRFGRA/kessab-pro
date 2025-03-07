import axiosInstance from "./axiosInstance";

class SalesService {
  fetchSales(params) {
    return axiosInstance.get("/sales", { params }).then((res) => res.data);
  }
  fetchSalesByBuyerId(buyerId) {
    return axiosInstance.get(`/sales/buyer/${buyerId}`).then((res) => res.data);
  }

  fetchSaleById(id) {
    return axiosInstance.get(`/sales/${id}`).then((res) => res.data);
  }

  fetchSaleInvoice(id) {
    return axiosInstance.post(`/pdf/sale/${id}`).then((res) => res.data);
  }

  closeSale(id) {
    return axiosInstance.post(`/sales/${id}/close`).then((res) => res.data);
  }

  createSale(SaleData) {
    return axiosInstance.post("/sales", SaleData).then((res) => res.data);
  }

  updateSale(id, SaleData) {
    return axiosInstance.put(`/sales/${id}`, SaleData).then((res) => res.data);
  }

  deleteSale(id) {
    return axiosInstance.delete(`/sales/${id}`).then((res) => res.data);
  }
}

export default new SalesService();
