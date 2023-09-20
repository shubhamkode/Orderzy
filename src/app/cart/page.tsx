import { getServerSession } from "next-auth";

import { authOptions } from "@/features/lib/auth";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  return <div>CartPage</div>;
}
