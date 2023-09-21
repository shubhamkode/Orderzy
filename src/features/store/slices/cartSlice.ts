import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartSliceState {
  cartItems: {
    [itemId: string]: number;
  };
}

const initialState: ICartSliceState = {
  cartItems: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (store, action: PayloadAction<{ itemId: string }>) => {
      store.cartItems[action.payload.itemId] = 1;
      return store;
    },
    updateItem: (
      store,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      store.cartItems[action.payload.itemId] = action.payload.quantity;
      return store;
    },
    deleteItem: (store, action: PayloadAction<{ itemId: string }>) => {
      delete store.cartItems[action.payload.itemId];
      return store;
    },
  },
});

export const { addItem, updateItem, deleteItem } = cartSlice.actions;
