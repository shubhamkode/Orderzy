"use server";

import { Item } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "../prisma";

interface ICreateNewItem {
  name: string;
  image?: string | null;
  price: number;
  userId: string;
}

export const CreateNewItem = async ({
  name,
  image,
  price,
  userId,
}: ICreateNewItem): Promise<Omit<Item, "userId">> => {
  return await prisma.item
    .create({
      data: { name, price, image, userId },
    })
    .then((data) => {
      revalidatePath("/");
      return data;
    });
};

export const GetAllItemsByUserId = async (userId: string): Promise<Item[]> => {
  const allItems = await prisma.item.findMany({
    where: { userId },
  });
  return allItems;
};

export const GetItemById = async (
  itemId: string,
  userId: string,
): Promise<Item | null> => {
  return await prisma.item.findUnique({
    where: { id: itemId, userId },
  });
};

export const UpdateItemById = async (
  itemId: string,
  userId: string,
  { name, image, price }: Partial<ICreateNewItem>,
): Promise<Omit<Item, "userId"> | null> => {
  const dbItem = await prisma.item.findUnique({
    where: { id: itemId, userId },
  });
  if (!dbItem) {
    return null;
  }
  return await prisma.item
    .update({
      where: {
        id: dbItem.id,
      },
      data: {
        name,
        image,
        price,
      },
    })
    .then((data) => {
      revalidatePath("/");
      return data;
    });
};

export const DeleteItemById = async (
  itemId: string,
  userId: string,
): Promise<Omit<Item, "userId"> | null> => {
  const dbItem = await prisma.item.findUnique({
    where: { id: itemId, userId },
  });
  if (!dbItem) {
    return null;
  }
  return await prisma.item
    .delete({
      where: { id: dbItem.id },
    })
    .then((data) => {
      revalidatePath("/");
      return data;
    });
};
