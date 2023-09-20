"use client";

import { FC } from "react";
import * as zod from "zod";
import { User } from "@prisma/client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const RegisterFormSchema = zod.object({
  username: zod.string({ required_error: "Username is Required" }),
  email: zod.string({ required_error: "Email is Required" }).email(),
  password: zod
    .string({ required_error: "Password is Required" })
    .min(3, "Password me be at least 3 digits")
    .max(10, "Password should not be more than 10 characters"),
});

type RegisterSchema = zod.infer<typeof RegisterFormSchema>;

interface IRegisterPageTemplateProps {
  registerUser: ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => Promise<Omit<User, "password">>;
}

const RegisterPageTemplate: FC<IRegisterPageTemplateProps> = ({
  registerUser,
}) => {
  const form = useForm<RegisterSchema>({
    // @ts-ignore
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await registerUser({ username, email, password });

    const res = await signIn("credentials", {
      email: response.email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-5 py-10 md:px-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full max-w-lg flex-col gap-y-3 rounded bg-white px-8 py-12 shadow ring-2 ring-slate-200"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-5 w-full">
            Register
          </Button>

          <div className="flex items-center justify-end  text-sm">
            <p className="">Already Registered?</p>
            <Button
              asChild
              className="px-1 text-blue-700 duration-200"
              variant="link"
            >
              <Link href="/auth/signIn" replace>
                Sign In
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPageTemplate;
