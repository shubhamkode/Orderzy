import { getServerSession } from "next-auth";

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
    throw new Error("User is not In Session");
  }
  return session.user;
};
