"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { signOut, useSession, signIn } from "next-auth/react";

import { useScrollDirection } from "@/features/hooks/useScrollDirection";
import { cn } from "@/features/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { updateSearchValue } from "@/features/store/slices/searchSlice";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Header() {
  const scrollDirection = useScrollDirection();
  const { status } = useSession();

  const searchValue = useAppSelector((store) => store.search);
  const dispatch = useAppDispatch();

  const [itemsInCart, setItemsInCart] = useState<number>(0);

  const { cartItems } = useAppSelector((store) => store.cart);

  useEffect(() => {
    setItemsInCart(Object.keys(cartItems).length);
  }, [cartItems]);

  return (
    <div
      className={cn(
        "sticky z-20 flex h-16 w-full items-center justify-between space-x-2 border-b-2 bg-white/80 px-4 py-4 shadow backdrop-blur-lg duration-200 md:px-8",
        scrollDirection === "down" ? "-top-16" : "top-0",
      )}
    >
      <Link href="/" className=" px-2 text-lg font-semibold tracking-wide">
        OrderZy
      </Link>
      <Input
        className="max-w-lg"
        placeholder="Search Item..."
        value={searchValue}
        onChange={(e) => dispatch(updateSearchValue(e.target.value))}
      />
      <div className="flex items-center space-x-3">
        <Button asChild variant="outline" size="icon" className="rounded-full">
          <Link href="/cart" className="relative px-2">
            <ShoppingBag />
            <p className="ext-lg absolute -right-2 -top-2 z-10  h-[25px] w-[25px] rounded-full bg-pink-500 text-center text-base font-bold text-white">
              {itemsInCart}
            </p>
          </Link>
        </Button>
        {!(status === "authenticated") ? (
          <Button className="whitespace-nowrap" onClick={() => signIn()}>
            Sign In
          </Button>
        ) : (
          <Button
            className="whitespace-nowrap"
            onClick={() => signOut()}
            asChild
          >
            <Link href="/">Sign Out</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
