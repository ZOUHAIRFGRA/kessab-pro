import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "../features/animalSlice";
import transactionReducer from "../features/transactionSlice";
import saleReducer from "../features/saleSlice";
import animalMedicalLogReducer from "../features/animalMedicalLogSlice";
import animalActivitiesLogReducer from "../features/animalActivitiesLogSlice";
import categoryReducer from "../features/categorySlice";
import iconsReducer from "../features/iconsSlice";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import buyerReducer from "../features/buyerSlice";
import enumReducer from "../features/enumSlice";

export const store = configureStore({
  reducer: {
    animals: animalReducer,
    user: userReducer,
    enums: enumReducer,
    transactions: transactionReducer,
    sales: saleReducer,
    categories: categoryReducer,
    buyers: buyerReducer,
    animalMedicalLogs: animalMedicalLogReducer,
    animalActivitiesLogs: animalActivitiesLogReducer,
    icons: iconsReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
