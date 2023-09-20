"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";

import * as zod from "zod";
import { Input } from "../components/ui/input";
import Link from "next/link";

const LoginFormSchema = zod.object({
  email: zod.string({ required_error: "Email is Required" }).email(),
  password: zod
    .string({ required_error: "Password is Required" })
    .min(3, "Password me be at least 3 digits")
    .max(10, "Password should not be more than 10 characters"),
});

type LoginSchema = zod.infer<typeof LoginFormSchema>;

interface ILoginPageTemplateProps {}

const LoginPageTemplate: FC<ILoginPageTemplateProps> = ({}) => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const form = useForm<LoginSchema>({
    // @ts-ignore
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      // callbackUrl: "/",
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
            Login
          </Button>

          <div className="flex items-center justify-end  text-sm">
            <p className="">New Here?</p>
            <Button
              asChild
              className="px-1 text-blue-700 duration-200"
              variant="link"
            >
              <Link href="/auth/signUp" replace>
                Register
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPageTemplate;
