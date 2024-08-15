import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import React, { ReactNode } from "react";
import ListItem from "@/app/components/ListItem";

export const metadata: Metadata = {
    title: "Chronocademy",
    description: "The platform where time becomes knowledge",
    icons: {
        icon: "/favicon.svg", // Path to your SVG favicon
    },
};

export default function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body>{children}
            <Navbar/>
            <Hero/>
        <div>
            <ul className={"flex justify-around py-1"}>
                <ListItem src={"/skills_exchange.svg"} alt={"skills icon"} text={"Skill Exchange"} />
                <ListItem src={"/google_meet.svg"} alt={"google meet icon"} text={"Google Meet Integration"} />
                <ListItem src={"/chrono_wallet.svg"} alt={"chrono wallet icon"} text={"Chrono Wallet"} />
                <ListItem src={"/flexible_payments.svg"} alt={"flexible payments icon"} text={"Flexible Payments"} />
            </ul>
        </div>
        </body>
        </html>
    );
}
