"use client";

import Footer from "@/app/landing/Footer";
import Navbar from "@/app/landing/Navbar";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export function MaybeLandingLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (!pathname.startsWith("/app") && !pathname.startsWith("/signup")) {
    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  return children;
}
