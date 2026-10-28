import { createSlice } from "@reduxjs/toolkit";

const round = (value) => Math.round(value * 100) / 100;

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

/**
 * Redux slice for the Paradise Nursery shopping cart.
 *
 * Each cart item keeps the plant details plus its quantity and line total, so
 * the cart page can show a per-plant cost without recalculating elsewhere.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const plant = action.payload;
      const existing = state.items.find((item) => item.id === plant.id);

      if (existing) {
        return;
      }

      state.items.push({
        id: plant.id,
        name: plant.name,
        price: plant.price,
        image: plant.image,
        potSize: plant.potSize,
        care: plant.care,
        quantity: 1,
        totalPrice: plant.price,
      });
      state.totalQuantity += 1;
      state.totalAmount = round(state.totalAmount + plant.price);
    },

    removeFromCart(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (!item) {
        return;
      }

      state.totalQuantity -= item.quantity;
      state.totalAmount = round(state.totalAmount - item.price * item.quantity);
      state.items = state.items.filter((entry) => entry.id !== action.payload);
    },

    increaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (!item) {
        return;
      }

      item.quantity += 1;
      item.totalPrice = round(item.price * item.quantity);
      state.totalQuantity += 1;
      state.totalAmount = round(state.totalAmount + item.price);
    },

    decreaseQuantity(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (!item) {
        return;
      }

      // Taking the last one out of the cart removes the whole line.
      if (item.quantity === 1) {
        state.totalQuantity -= 1;
        state.totalAmount = round(state.totalAmount - item.price);
        state.items = state.items.filter(
          (entry) => entry.id !== action.payload,
        );
        return;
      }

      item.quantity -= 1;
      item.totalPrice = round(item.price * item.quantity);
      state.totalQuantity -= 1;
      state.totalAmount = round(state.totalAmount - item.price);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

/** Handy selectors used by the navbar and cart page. */
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export const cartReducer = cartSlice.reducer;
export default cartReducer;
