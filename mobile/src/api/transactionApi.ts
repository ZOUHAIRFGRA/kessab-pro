import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Request Types
export interface TransactionCreateRequest {
  buyerId?: number;
  saleId?: number;
  amount: number;
  transactionDate: string;
  paymentMethod: string;
  paymentStatus: string;
  description?: string;
  [key: string]: any;
}

export interface TransactionUpdateRequest extends Partial<TransactionCreateRequest> {}

export interface ConsumeTransactionRequest {
  amount: number;
  transactionDate: string;
  paymentMethod: string;
  description?: string;
  [key: string]: any;
}

// Response Types
export interface Transaction {
  id: number;
  buyerId?: number;
  buyerName?: string;
  saleId?: number;
  amount: number;
  transactionDate: string;
  paymentMethod: string;
  paymentStatus: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface TransactionInvoice {
  invoiceId: string;
  pdfUrl?: string;
  pdfData?: string;
  [key: string]: any;
}

class TransactionsService {
  fetchTransactions(): Promise<Transaction[]> {
    return axiosInstance
      .get("/transactions")
      .then((res: AxiosResponse<Transaction[]>) => res.data);
  }

  fetchTransactionById(id: number): Promise<Transaction> {
    return axiosInstance
      .get(`/transactions/${id}`)
      .then((res: AxiosResponse<Transaction>) => res.data);
  }

  fetchTransactionInvoice(id: number): Promise<TransactionInvoice> {
    return axiosInstance
      .post(`/pdf/transaction/${id}`)
      .then((res: AxiosResponse<TransactionInvoice>) => res.data);
  }

  consumeTransaction(buyer_id: number, transaction: ConsumeTransactionRequest): Promise<Transaction> {
    return axiosInstance
      .post(`/transactions/buyer/${buyer_id}`, transaction)
      .then((res: AxiosResponse<Transaction>) => res.data);
  }

  createTransaction(transactionData: TransactionCreateRequest): Promise<Transaction> {
    return axiosInstance
      .post("/transactions", transactionData)
      .then((res: AxiosResponse<Transaction>) => res.data);
  }

  updateTransaction(id: number, transactionData: TransactionUpdateRequest): Promise<Transaction> {
    return axiosInstance
      .put(`/transactions/${id}`, transactionData)
      .then((res: AxiosResponse<Transaction>) => res.data);
  }

  deleteTransaction(id: number): Promise<void> {
    return axiosInstance
      .delete(`/transactions/${id}`)
      .then((res: AxiosResponse<void>) => res.data);
  }

  fetchTransactionsBySale(saleId: number): Promise<Transaction[]> {
    return axiosInstance
      .get(`/transactions/sale/${saleId}`)
      .then((res: AxiosResponse<Transaction[]>) => res.data);
  }

  fetchTransactionsByBuyer(buyerId: number): Promise<Transaction[]> {
    return axiosInstance
      .get(`/transactions/buyer/${buyerId}`)
      .then((res: AxiosResponse<Transaction[]>) => res.data);
  }
}

export default new TransactionsService();
