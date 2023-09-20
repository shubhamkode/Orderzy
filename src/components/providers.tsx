"use client";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/features/store";

interface IProvidersProps {
  children: ReactNode;
}

const Providers: FC<IProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default Providers;
