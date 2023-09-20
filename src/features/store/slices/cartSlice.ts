import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartSliceState {}

const initialState: ICartSliceState = {};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (store, action: PayloadAction) => {},
    updateItem: (store, action: PayloadAction) => {},
    deleteItem: (store, action: PayloadAction) => {},
  },
});

export const { addItem, updateItem, deleteItem } = cartSlice.actions;
