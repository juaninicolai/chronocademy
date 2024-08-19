"use client"

import ListItem from "@/app/components/ListItem";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const features = [
    {
        src: "/skills_exchange.svg",
        alt: "skills icon",
        text: "Skill Exchange",
        dialogText: "Earn and spend Chrono to foster a community-driven approach to education"
    },
    {
        src: "/google_meet.svg",
        alt: "google meet icon",
        text: "Google Meet Integration",
        dialogText: "Scheduling and video conferencing through Google Calendar and Google Meet"
    },
    {
        src: "/chrono_wallet.svg",
        alt: "chrono wallet icon",
        text: "Chrono Wallet",
        dialogText: "Track your earned and spent time credits easily."
    },
    {
        src: "/flexible_payments.svg",
        alt: "flexible payments icon",
        text: "Flexible Payments",
        dialogText: "Convert Chrono to cash or purchase additional credits."
    },
];

export default function FeatureList() {
    const [openDialogs, setOpenDialogs] = useState(features.map(() => false));

    const toggleDialog = (index: number) => {
        setOpenDialogs(openDialogs.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
    };

    return (
        <div>
            <ul className="flex justify-around py-1">
                {features.map((feature, index) => (
                    <div key={index}
                         className="flex flex-col items-center space-y-4 relative"
                         onClick={() => toggleDialog(index)}
                    >
                        <ListItem src={feature.src} alt={feature.alt} text={feature.text}/>
                        <dialog className="absolute top-20 z-10" open={openDialogs[index]}>
                            <div className={"flex flex-col items-center justify-center space-y-2"}>
                                <p className={"text-center"}>{feature.dialogText}</p>
                                <IoIosArrowUp onClick={() => toggleDialog(index)}/>
                            </div>
                        </dialog>
                        <IoIosArrowDown/>
                    </div>
                ))}
            </ul>
        </div>
    );
}