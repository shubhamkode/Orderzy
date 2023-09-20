import { AuthProvider } from "@/features/lib/providers/AuthProvider";
import RegisterPageTemplate from "@/templates/RegisterPageTemplate";

const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  "use server";
  return await AuthProvider.Register({ username, email, password });
};

export default async function RegisterPage() {
  return <RegisterPageTemplate registerUser={registerUser} />;
}
