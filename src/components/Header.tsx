"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { signOut, useSession, signIn } from "next-auth/react";

import { useScrollDirection } from "@/features/hooks/useScrollDirection";
import { cn } from "@/features/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { updateSearchValue } from "@/features/store/slices/searchSlice";

export default function Header() {
  const scrollDirection = useScrollDirection();
  const { status } = useSession();

  const searchValue = useAppSelector((store) => store.search);
  const dispatch = useAppDispatch();

  return (
    <div
      className={cn(
        "sticky z-20 flex h-16 w-full items-center justify-between space-x-2 border-b-2 bg-white/80 px-4 py-4 shadow backdrop-blur-lg duration-200 md:px-8",
        scrollDirection === "down" ? "-top-16" : "top-0",
      )}
    >
      <Link
        href="/"
        className="rounded-full text-3xl font-semibold tracking-wide"
      >
        <Image
          src="/favicon.ico"
          alt=""
          height="100"
          width="100"
          className="h-10 w-16 rounded-full object-cover"
        />
      </Link>
      <Input
        className="max-w-lg"
        placeholder="Search Item..."
        value={searchValue}
        onChange={(e) => dispatch(updateSearchValue(e.target.value))}
      />
      <div className="flex items-center space-x-3">
        <Button asChild variant="link" size="icon" className="rounded-full">
          <Link href="/cart" className="relative px-2">
            <ShoppingBag />
            <p className="absolute -right-2 -top-2 z-10 rounded-full  px-2 text-lg">
              0
            </p>
          </Link>
        </Button>
        {!(status === "authenticated") ? (
          <Button className="whitespace-nowrap" onClick={() => signIn()}>
            Sign In
          </Button>
        ) : (
          <Button className="whitespace-nowrap" onClick={() => signOut()}>
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}
