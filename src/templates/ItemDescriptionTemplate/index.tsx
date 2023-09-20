"use client";

import Image from "next/image";
import Link from "next/link";
import { Item } from "@prisma/client";
import React, { FC, useState } from "react";
import Balancer from "react-wrap-balancer";
import { cn } from "@/features/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DeleteItemById,
  UpdateItemById,
} from "@/features/lib/providers/ItemProvider";
import { Pencil, Trash } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { revalidatePath } from "next/cache";

const updateItemSchema = zod.object({
  name: zod.string().min(1, "Name is Required"),
  price: zod.string().min(1, "Price is Required"),
  description: zod.string(),
});

type UpdateNewItem = zod.infer<typeof updateItemSchema>;

function EditDialog({ item }: { item: Item }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { reset, ...form } = useForm<UpdateNewItem>({
    // @ts-ignore
    resolver: zodResolver(updateItemSchema),
    defaultValues: {
      name: item.name,
      price: String(item.price),
      description: "",
    },
  });

  const handleSubmit = async (values: zod.infer<typeof updateItemSchema>) => {
    const updatedItem = await UpdateItemById(item.id, item.userId, {
      name: values.name,
      price: Number(values.price),
    });
    if (updatedItem) {
      setMenuOpen(false);
    }
  };

  return (
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-slate-100 text-black hover:bg-slate-100"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Item</DialogTitle>
        </DialogHeader>
        <Form reset={reset} {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 px-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the Product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 w-full">
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface IItemDescriptionPageTemplateProps {
  item: Item;
}

const ItemDescriptionPageTemplate: FC<IItemDescriptionPageTemplateProps> = ({
  item,
}) => {
  return (
    <div className="container relative mx-auto mt-10  px-4 py-2">
      <div className="absolute right-8 top-5 ">
        <EditDialog item={item} />
      </div>

      <Button
        className="absolute right-8 top-16  bg-red-500/80 px-2"
        variant="destructive"
        size="icon"
        asChild
      >
        <Link
          href="/"
          onClick={async () => {
            await DeleteItemById(item.id, item.userId);
          }}
        >
          <Trash className="text-white" />
        </Link>
      </Button>

      <Image
        src="/img/burger.jpg"
        alt="Image"
        width="1000"
        height="1000"
        className="aspect-[2.15/1.24] h-1/2 w-full rounded object-cover object-right-bottom shadow md:aspect-[1.75/0.75]"
      />
      <div className="mt-4  gap-y-2  rounded border-[1px] bg-white px-5 py-5 shadow">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold leading-8">{item.name}</h3>
          <p className="px-1 text-2xl font-bold leading-9">
            &#x20b9;{item.price}
          </p>
        </div>

        <p
          className={cn(
            "mt-3 line-clamp-3 text-center text-sm tracking-wide text-gray-700",
          )}
        >
          <Balancer>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            veritatis unde mollitia odit nesciunt voluptatibus sed tempore in,
            dolorum architecto.
          </Balancer>
        </p>

        <div className="mt-5 flex items-center justify-end px-2">
          <Button className="w-full whitespace-nowrap md:w-fit">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptionPageTemplate;
