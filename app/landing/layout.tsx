import React, { ReactNode } from "react";
import Navbar from "@/app/landing/Navbar";
import Footer from "@/app/landing/Footer";

export default function LandingLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
