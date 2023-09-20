"use client";

import { FC } from "react";
import { Item } from "@prisma/client";
import ItemList from "@/components/ItemList";
import DialogSection from "./sections/DialogSection";
import { useAppSelector } from "@/features/store";
import { useDebounce } from "@/features/hooks/useDebounceHook";

interface IHomePageTemplateProps {
  items: Item[];
  userId: string;
}

const HomePageTemplate: FC<IHomePageTemplateProps> = ({ items }) => {
  const searchTerm = useAppSelector((store) => store.search);
  const debouncedValue = useDebounce<string>(searchTerm, 500);

  return (
    <>
      {/* <DialogSection /> */}
      <main className="space-y-4 px-4 py-5">
        <DialogSection />
        <ItemList
          items={
            searchTerm !== ""
              ? items.filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(debouncedValue.toLowerCase()),
                )
              : items
          }
        />
      </main>
    </>
  );
};

export default HomePageTemplate;
