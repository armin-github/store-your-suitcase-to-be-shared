import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "day drop-off for your luggage",
  description: "We store your suitcases for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-sm text-zinc-900 bg-[#E5E8EC] min-h-screen`}>
      <SessionProvider>
      {children}
      </SessionProvider>
      <Analytics/>
      </body>
    </html>
  );
}
