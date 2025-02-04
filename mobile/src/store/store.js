import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "../features/animalSlice";
import transactionReducer from "../features/transactionSlice";
import saleReducer from "../features/saleSlice";

export const store = configureStore({
  reducer: {
    animals: animalReducer,
    transactions: transactionReducer,
    sales: saleReducer,
  },
});
