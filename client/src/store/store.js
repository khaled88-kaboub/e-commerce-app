import { configureStore } from "@reduxjs/toolkit";
import { restoreSession } from "./authSlice";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

store.dispatch(restoreSession());
