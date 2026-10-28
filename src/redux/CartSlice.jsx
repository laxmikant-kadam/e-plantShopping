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
 * The three reducers required by the course project are:
 *   addItem()        - adds a plant to the cart
 *   removeItem()     - removes a plant from the cart by name (or id)
 *   updateQuantity() - updates a plant's quantity, removing it at zero
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const plant = action.payload;

      if (!plant) {
        return;
      }

      const alreadyAdded = state.items.some((item) => item.id === plant.id);

      if (alreadyAdded) {
        return;
      }

      const cost = plant.cost ?? plant.price;

      state.items.push({
        id: plant.id,
        name: plant.name,
        cost,
        // `price` mirrors `cost` for components that still read it.
        price: cost,
        image: plant.image,
        potSize: plant.potSize,
        care: plant.care,
        quantity: 1,
        totalPrice: cost,
      });

      state.totalQuantity += 1;
      state.totalAmount = round(state.totalAmount + cost);
    },

    removeItem(state, action) {
      const key = action.payload;
      const item = state.items.find(
        (entry) => entry.name === key || entry.id === key,
      );

      if (!item) {
        return;
      }

      const cost = item.cost ?? item.price;

      state.totalQuantity -= item.quantity;
      state.totalAmount = round(state.totalAmount - cost * item.quantity);
      state.items = state.items.filter((entry) => entry !== item);
    },

    updateQuantity(state, action) {
      const { id, name, quantity } = action.payload || {};
      const item = state.items.find(
        (entry) =>
          (id !== undefined && entry.id === id) ||
          (name !== undefined && entry.name === name),
      );

      if (!item) {
        return;
      }

      const nextQuantity = Math.max(0, Number(quantity) || 0);
      const cost = item.cost ?? item.price;

      // A quantity of zero takes the plant out of the cart.
      if (nextQuantity === 0) {
        state.totalQuantity -= item.quantity;
        state.totalAmount = round(state.totalAmount - cost * item.quantity);
        state.items = state.items.filter((entry) => entry !== item);
        return;
      }

      const difference = nextQuantity - item.quantity;

      item.quantity = nextQuantity;
      item.totalPrice = round(cost * nextQuantity);
      state.totalQuantity += difference;
      state.totalAmount = round(state.totalAmount + difference * cost);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

/** Handy selectors used by the navbar and cart page. */
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export const cartReducer = cartSlice.reducer;
export default cartReducer;
