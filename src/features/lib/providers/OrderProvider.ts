import prisma from "../prisma";

import { Order } from "@prisma/client";

export const OrderManager = async (userId: string) => {
  return {
    PlaceNewOrder: async ({
      items,
    }: {
      items: { itemId: string; quantity: number }[];
    }): Promise<Order> => {
      const newOrder = await prisma.order.create({
        data: {
          userId: userId,
          ProductOnOrder: {
            createMany: {
              data: items,
            },
          },
        },
      });
      return { ...newOrder };
    },
    GetAllOrdersByUserId: async (): Promise<Order[]> => {
      return await prisma.order.findMany({
        where: {
          userId,
        },
      });
    },
    // UpdateOrderById: async () => {},
    // DeleteOrderById: async () => {},
  };
};

