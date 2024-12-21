import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import { Inter, Roboto } from "next/font/google";
import classNames from "classnames";
import { MaybeLandingLayout } from "@/app/landing/landing";
import { getServerSession } from "next-auth";
import { SessionProvider } from "@/app/app/session";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Chronocademy",
  description: "The platform where time becomes knowledge",
  icons: {
    icon: "/favicon.svg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={classNames("w-full", inter.variable, roboto.variable)}>
        <SessionProvider session={session}>
          <MaybeLandingLayout>
            {children}
            <Toaster />
          </MaybeLandingLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
