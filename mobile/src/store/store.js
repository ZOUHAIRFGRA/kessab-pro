import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "../features/animalSlice";

export const store = configureStore({
  reducer: {
    animals: animalReducer,
  },
});
