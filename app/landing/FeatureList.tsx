"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ListItem from "@/app/landing/ListItem";

const features = [
  {
    src: "/skills_exchange.svg",
    alt: "skills icon",
    text: "Skill Exchange",
    dialogText:
      "Teach what you know and learn what you want. We connect users, allowing them to exchange skills directly through time-based credits.",
  },
  {
    src: "/google_meet.svg",
    alt: "google meet icon",
    text: "Calendar and video Integration",
    dialogText:
      "Schedule and conduct lessons with integrated Calendar and Video platform, making it easy for users to connect, schedule, and learn.",
  },
  {
    src: "/chrono_wallet.svg",
    alt: "chrono wallet icon",
    text: "Chrono Wallet",
    dialogText:
      "The Chrono Wallet gives you an overview of your balance, helping you monitor your transactions and ensure smooth exchanges on the platform.",
  },
  {
    src: "/flexible_payments.svg",
    alt: "flexible payments icon",
    text: "Flexible Transactions",
    dialogText:
      "Use Chrono credits or real money to pay for classes. Keep your Chrono credits in your Wallet for future use or convert them into cash.",
  },
];

export default function FeatureList() {
  const [openDialogs, setOpenDialogs] = useState(features.map(() => false));

  const toggleDialog = (index: number) => {
    setOpenDialogs(
      openDialogs.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  return (
    <div id={"features"}>
      <ul className="flex justify-around py-1">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col cursor-pointer font-bold items-center space-y-4 relative w-1/6 pb-8"
            onClick={() => toggleDialog(index)}
          >
            <ListItem src={feature.src} alt={feature.alt} text={feature.text} />
            <dialog className="absolute top-20 z-10" open={openDialogs[index]}>
              <div
                className={
                  "flex flex-col cursor-pointer items-center justify-center space-y-2"
                }
              >
                <p className={"text-center font-normal text-sm line-clamp-4"}>
                  {feature.dialogText}
                </p>
                <IoIosArrowUp onClick={() => toggleDialog(index)} />
              </div>
            </dialog>
            <IoIosArrowDown />
          </div>
        ))}
      </ul>
    </div>
  );
}
