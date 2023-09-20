import { FC } from "react";
import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";

interface IItemListProps {
  items: Item[];
}

const ItemList: FC<IItemListProps> = ({ items }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-2 pb-20 mt-2 space-y-5">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
