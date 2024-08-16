import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import React, { ReactNode } from "react";
import FeatureList from "@/app/components/FeatureList";
import HowItWorks from "@/app/components/HowItWorks";

export const metadata: Metadata = {
    title: "Chronocademy",
    description: "The platform where time becomes knowledge",
    icons: {
        icon: "/favicon.svg"
    },
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
            <body className={"w-full"}>{children}
                <Navbar/>
                <Hero/>
                <FeatureList/>
                <HowItWorks/>
            </body>
        </html>
    );
}
