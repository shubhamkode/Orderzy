import { Plus } from "lucide-react";

import { FC } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Item } from "@prisma/client";
import Link from "next/link";

interface IItemCardProps {
  item: Item;
}

const ItemCard: FC<IItemCardProps> = ({ item }) => {
  return (
    <Card className="w-full max-w-[400px] p-0">
      <Link href={`/item/${item.id}`}>
        <CardHeader className="p-0">
          <Image
            src="/img/burger.jpg"
            alt="Base Image"
            width="200"
            height="200"
            className="aspect-[2.2/1.3] w-full rounded-t-lg object-cover"
          />
        </CardHeader>
      </Link>
      <CardContent className="flex items-center justify-between px-4 py-6">
        <Link href={`/item/${item.id}`} className="space-y-2">
          <CardTitle className="text-sm tracking-wide text-gray-600">
            {item.name}
          </CardTitle>
          <CardDescription className="text-xl font-bold text-black ">
            &#x20b9;{item.price}
          </CardDescription>
        </Link>

        <Button className="px-3">
          <Plus size={22} />
          Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
