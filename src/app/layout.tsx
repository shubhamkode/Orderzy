import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

import Providers from "@/components/providers";
import Header from "@/components/Header";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orderzy",
  description: "High speed order taking App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-[100dvh] bg-[#f7f7f7]`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
