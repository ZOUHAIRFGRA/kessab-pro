import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Request Types
export interface BuyerQuery {
  page?: number;
  size?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface BuyerCreateRequest {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  [key: string]: any;
}

export interface BuyerUpdateRequest extends Partial<BuyerCreateRequest> {}

// Response Types
export interface Buyer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface BuyerListResponse {
  content: Buyer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface BuyerOverview {
  buyer: Buyer;
  totalPurchases: number;
  totalAmount: number;
  lastPurchaseDate?: string;
  [key: string]: any;
}

class BuyersService {
  fetchBuyers(query?: BuyerQuery): Promise<BuyerListResponse> {
    return axiosInstance
      .get("/buyers", { params: query })
      .then((res: AxiosResponse<BuyerListResponse>) => res.data);
  }

  fetchBuyerById(id: number): Promise<Buyer> {
    return axiosInstance
      .get(`/buyers/${id}`)
      .then((res: AxiosResponse<Buyer>) => res.data);
  }

  fetchBuyerOverview(id: number): Promise<BuyerOverview> {
    return axiosInstance
      .get(`/buyers/${id}/overview`)
      .then((res: AxiosResponse<BuyerOverview>) => res.data);
  }

  createBuyer(payload: BuyerCreateRequest): Promise<Buyer> {
    return axiosInstance
      .post("/buyers", payload)
      .then((res: AxiosResponse<Buyer>) => res.data);
  }

  updateBuyer(id: number, buyer: BuyerUpdateRequest): Promise<Buyer> {
    return axiosInstance
      .put(`/buyers/${id}`, buyer)
      .then((res: AxiosResponse<Buyer>) => res.data);
  }

  deleteBuyer(id: number): Promise<void> {
    return axiosInstance
      .delete(`/buyers/${id}`)
      .then((res: AxiosResponse<void>) => res.data);
  }
}

export default new BuyersService();
