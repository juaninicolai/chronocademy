import React from "react";
import Box from "@/app/landing/Box";

export default function HowItWorks() {
  return (
    <div
      id="how-it-works"
      className="flex flex-col justify-center items-center py-16"
    >
      <h1 className="font-inter text-4xl text-secondary-black-500 font-extrabold">
        How It Works
      </h1>
      <h2 className="font-roboto text-h2 py-4 text-center">
        Explore the various ways to use your Chrono credits and maximize your
        experience.
      </h2>
      <div className="flex flex-wrap justify-center gap-10 pt-8">
        <Box
          color="bg-gradient-to-r from-primary-blue-100 to-primary-blue-400"
          image="/earn_chrono.svg"
          title="Earn Chronos"
          body={
            <>
              Use some of your time to <span className="font-bold">teach</span>{" "}
              any of your skills to someone else or{" "}
              <span className="font-bold">refer</span> us to a friend and earn
              Chrono credits for it.
            </>
          }
        />
        <Box
          color="bg-gradient-to-r from-primary-green-100 to-primary-green-400"
          image="/spend_chronos.svg"
          title="Spend Chronos"
          body={
            <>
              Use your Chrono credits to{" "}
              <span className="font-bold">learn</span> a skill from someone else
              or to{" "}
              <span className="font-bold">unlock rewards or services</span>{" "}
              offered by Chronocademy.
            </>
          }
        />
        <Box
          color="bg-gradient-to-r from-secondary-yellow-100 to-secondary-yellow-400"
          image="/buy_chronos.svg"
          title="Trade Chronos"
          body={
            <>
              If you do not want or do not have time to teach or learn a skill,
              you can <span className="font-bold">buy or sell</span> Chrono
              credits in the platform.
            </>
          }
        />
      </div>
    </div>
  );
}
