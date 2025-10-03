import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    setCartFromServer: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCartFromServer,
} = cartSlice.actions;
export default cartSlice.reducer;
