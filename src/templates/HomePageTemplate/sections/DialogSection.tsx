"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useSession } from "next-auth/react";
import { CreateNewItem } from "@/features/lib/providers/ItemProvider";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const createNewItemSchema = zod.object({
  name: zod.string().min(1, "Name is Required"),
  price: zod.string().min(1, "Price is Required"),
  description: zod.string().nullish(),
});

type CreateNewItem = zod.infer<typeof createNewItemSchema>;

export default function DialogSection() {
  const { data } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { reset, ...form } = useForm<CreateNewItem>({
    // @ts-ignore
    resolver: zodResolver(createNewItemSchema),
    defaultValues: {
      name: "",
      price: "",
      description: undefined,
    },
  });

  const handleSubmit = async (
    values: zod.infer<typeof createNewItemSchema>,
  ) => {
    if (!data?.user.id) {
      return;
    }

    const newItem = await CreateNewItem({
      name: values.name,
      price: Number(values.price),
      description: values.description,
      userId: data.user.id,
    });

    if (newItem) {
      reset();
      setMenuOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
      <div className="flex items-center justify-end">
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2" /> Add New Item
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold leading-relaxed">
            Add a new Item
          </DialogTitle>
        </DialogHeader>
        <Form reset={reset} {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-y-4 px-2"
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
                    {/* @ts-ignore */}
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4">
              Upload
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
