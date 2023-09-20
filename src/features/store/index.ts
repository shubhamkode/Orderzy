import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./slices/searchSlice";
import { cartSlice } from "./slices/cartSlice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    [searchSlice.name]: searchSlice.reducer,
    [cartSlice.name]: cartSlice.reducer
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
