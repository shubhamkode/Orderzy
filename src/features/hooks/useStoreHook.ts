import { useAppSelector, useAppDispatch } from "../store";
import { addItem, deleteItem, updateItem } from "../store/slices/cartSlice";

export default function useStoreHook({ itemId }: { itemId: string }) {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const isItemInCart: boolean = cartItems.hasOwnProperty(itemId);

  const addItemToCart = () => dispatch(addItem({ itemId }));

  const updateItemInCart = (quantity: number) =>
    dispatch(updateItem({ itemId, quantity }));

  const deleteItemInCart = () => dispatch(deleteItem({ itemId }));

  return { isItemInCart, addItemToCart, updateItemInCart, deleteItemInCart };
}
