import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    updateSearchValue: (store, action: PayloadAction<string>) => {
      return store = action.payload;
    },
  },
});

export const { updateSearchValue } = searchSlice.actions;
