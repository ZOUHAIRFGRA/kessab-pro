import axiosInstance from "./axiosInstance";

class TransactionsService {
  fetchTransactions() {
    return axiosInstance.get("/transactions").then((res) => res.data);
  }

  fetchTransactionById(id) {
    return axiosInstance.get(`/transactions/${id}`).then((res) => res.data);
  }

  fetchTransactionInvoice(id) {
    return axiosInstance.post(`/pdf/transaction/${id}`).then((res) => res.data);
  }

  createTransaction(transactionData) {
    return axiosInstance
      .post("/transactions", transactionData)
      .then((res) => res.data);
  }

  updateTransaction(id, transactionData) {
    return axiosInstance
      .put(`/transactions/${id}`, transactionData)
      .then((res) => res.data);
  }

  deleteTransaction(id) {
    return axiosInstance.delete(`/transactions/${id}`).then((res) => res.data);
  }

  fetchTransactionsBySale(saleId) {
    return axiosInstance
      .get(`/transactions/sale/${saleId}`)
      .then((res) => res.data);
  }

  fetchTransactionsByBuyer(buyerId) {
    return axiosInstance
      .get(`/transactions/buyer/${buyerId}`)
      .then((res) => res.data);
  }
}

export default new TransactionsService();
