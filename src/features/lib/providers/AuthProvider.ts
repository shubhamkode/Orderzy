import prisma from "@/features/lib/prisma";
import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";

const LogIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Omit<User, "password"> | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return null;
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return { ...user };
};

const Register = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}): Promise<Omit<User, "password">> => {
  const newUser = await prisma.user.create({
    data: {
      email,
      password: await hash(password, 10),
      username,
    },
  });
  return { ...newUser };
};

export const AuthProvider = {
  LogIn,
  Register,
};
