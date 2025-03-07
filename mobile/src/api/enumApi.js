import axiosInstance from "./axiosInstance";

class EnumApi {
  getPaymentStatus = async () => {
    return axiosInstance.get("/enums/payment_status");
  };

  getPaymentMethods = async () => {
    return axiosInstance.get("/enums/payment_method");
  };
}

export default new EnumApi();
