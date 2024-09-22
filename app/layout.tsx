import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import { Inter, Roboto } from "next/font/google";
import Navbar from "@/app/landing/Navbar";
import Footer from "@/app/landing/Footer";
import classNames from 'classnames';

export const metadata: Metadata = {
  title: "Chronocademy",
  description: "The platform where time becomes knowledge",
  icons: {
    icon: "/favicon.svg",
  },
};

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-roboto'
});

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
      <html lang="en">
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body className={classNames("w-full", inter.variable, roboto.variable)}>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
      </body>
      </html>
  );
}
