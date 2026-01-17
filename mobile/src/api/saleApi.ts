import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Request Types
export interface SaleQuery {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  buyerId?: number;
}

export interface SaleCreateRequest {
  buyerId: number;
  animalIds: number[];
  totalAmount: number;
  saleDate: string;
  notes?: string;
  [key: string]: any;
}

export interface SaleUpdateRequest extends Partial<SaleCreateRequest> {}

// Response Types
export interface Sale {
  id: number;
  buyerId: number;
  buyerName?: string;
  animalIds: number[];
  totalAmount: number;
  saleDate: string;
  status: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface SaleListResponse {
  content: Sale[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface SaleInvoice {
  invoiceId: string;
  pdfUrl?: string;
  pdfData?: string;
  [key: string]: any;
}

class SalesService {
  fetchSales(params?: SaleQuery): Promise<SaleListResponse> {
    return axiosInstance
      .get("/sales", { params })
      .then((res: AxiosResponse<SaleListResponse>) => res.data);
  }

  fetchSalesByBuyerId(buyerId: number): Promise<Sale[]> {
    return axiosInstance
      .get(`/sales/buyer/${buyerId}`)
      .then((res: AxiosResponse<Sale[]>) => res.data);
  }

  fetchSaleById(id: number): Promise<Sale> {
    return axiosInstance
      .get(`/sales/${id}`)
      .then((res: AxiosResponse<Sale>) => res.data);
  }

  fetchSaleInvoice(id: number): Promise<SaleInvoice> {
    return axiosInstance
      .post(`/pdf/sale/${id}`)
      .then((res: AxiosResponse<SaleInvoice>) => res.data);
  }

  closeSale(id: number): Promise<Sale> {
    return axiosInstance
      .post(`/sales/${id}/close`)
      .then((res: AxiosResponse<Sale>) => res.data);
  }

  createSale(SaleData: SaleCreateRequest): Promise<Sale> {
    return axiosInstance
      .post("/sales", SaleData)
      .then((res: AxiosResponse<Sale>) => res.data);
  }

  updateSale(id: number, SaleData: SaleUpdateRequest): Promise<Sale> {
    return axiosInstance
      .put(`/sales/${id}`, SaleData)
      .then((res: AxiosResponse<Sale>) => res.data);
  }

  deleteSale(id: number): Promise<void> {
    return axiosInstance
      .delete(`/sales/${id}`)
      .then((res: AxiosResponse<void>) => res.data);
  }
}

export default new SalesService();
