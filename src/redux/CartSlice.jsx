import { createSlice } from "@reduxjs/toolkit";

const round = (value) => Math.round(value * 100) / 100;

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

/** Adds one plant to the cart. A plant can only appear once. */
function addPlant(state, plant) {
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
    // `price` is kept so older parts of the app can read the same value.
    price: cost,
    image: plant.image,
    potSize: plant.potSize,
    care: plant.care,
    quantity: 1,
    totalPrice: cost,
  });

  state.totalQuantity += 1;
  state.totalAmount = round(state.totalAmount + cost);
}

/** Removes a cart line by plant name (or id) and corrects the totals. */
function removePlant(state, key) {
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
}

/** Sets a line to an absolute quantity. Setting it to 0 removes the line. */
function setQuantity(state, payload) {
  const { id, name, quantity } = payload || {};
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

  if (nextQuantity === 0) {
    removePlant(state, item.name);
    return;
  }

  const difference = nextQuantity - item.quantity;

  item.quantity = nextQuantity;
  item.totalPrice = round(cost * nextQuantity);
  state.totalQuantity += difference;
  state.totalAmount = round(state.totalAmount + difference * cost);
}

/**
 * Redux slice for the Paradise Nursery shopping cart.
 *
 * The course project expects the `addItem`, `removeItem` and `updateQuantity`
 * reducers. The quantity helpers from the first version of the app are kept as
 * thin aliases so both styles of dispatch work.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      addPlant(state, action.payload);
    },

    removeItem(state, action) {
      removePlant(state, action.payload);
    },

    updateQuantity(state, action) {
      setQuantity(state, action.payload);
    },

    /* Aliases used by the product listing and by the navbar. */
    addToCart(state, action) {
      addPlant(state, action.payload);
    },

    removeFromCart(state, action) {
      removePlant(state, action.payload);
    },

    increaseQuantity(state, action) {
      const item = state.items.find(
        (entry) => entry.id === action.payload || entry.name === action.payload,
      );

      if (item) {
        setQuantity(state, { id: item.id, quantity: item.quantity + 1 });
      }
    },

    decreaseQuantity(state, action) {
      const item = state.items.find(
        (entry) => entry.id === action.payload || entry.name === action.payload,
      );

      if (item) {
        setQuantity(state, { id: item.id, quantity: item.quantity - 1 });
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
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
