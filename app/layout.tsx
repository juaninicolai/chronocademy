import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import React, { ReactNode } from "react";
import FeatureList from "@/app/components/FeatureList";
import HowItWorks from "@/app/components/HowItWorks";
import { Inter, Roboto } from 'next/font/google';

export const metadata: Metadata = {
    title: "Chronocademy",
    description: "The platform where time becomes knowledge",
    icons: {
        icon: "/favicon.svg"
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

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} w-full`}>{children}
        <Navbar/>
        <Hero/>
        <FeatureList/>
        <HowItWorks/>
        </body>
        </html>
    );
}
