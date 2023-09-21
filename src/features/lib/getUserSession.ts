import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await getServerSession({
    callbacks: {
      session: ({ session, token }) => {
        session.user.id = (token as any).id;
        return session;
      },
    },
  });

  if (!session || !session.user) {
    throw redirect("/");
  }
  return session.user;
};
