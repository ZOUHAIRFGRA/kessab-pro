import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

// Response Types
export interface EnumValue {
  key: string;
  value: string;
  description?: string;
}

export type PaymentStatus = EnumValue;
export type PaymentMethod = EnumValue;

class EnumApi {
  getPaymentStatus = async (): Promise<AxiosResponse<PaymentStatus[]>> => {
    return axiosInstance.get("/enums/payment_status");
  };

  getPaymentMethods = async (): Promise<AxiosResponse<PaymentMethod[]>> => {
    return axiosInstance.get("/enums/payment_method");
  };
}

export default new EnumApi();
