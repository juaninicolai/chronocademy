import React from "react";
import Box from "@/app/components/Box";

export default function HowItWorks() {
    return <div id={"how-it-works"} className={"flex flex-col justify-center items-center py-16"}>
        <h1 className={"font-bold text-4xl text-secondary-black-500"}>How it works</h1>
        <h2 className={"font-roboto text-h1 py-4"}>Learn how to earn and spend time credits on Chronocademy with
            our easy step-by-step guide.</h2>
        <div className={"flex space-x-10 pt-16"}>
            <Box
                color="bg-gradient-to-r from-primary-blue-400 to-primary-blue-100"
                image="/earn_chrono.svg"
                title="Earn Chronos"
                body={
                    <>
                        Use some of your time to teach<br/>any of your skills to someone<br/>else and earn Chrono
                        credits for<br/>it.
                    </>
                }
            />
            <Box
                color="bg-gradient-to-r from-primary-green-400 to-primary-green-100"
                image="/spend_chronos.svg"
                title="Spend Chronos"
                body={
                    <>
                        Use your Chrono credits to learn<br/>a skill from someone else or to<br/>unlock rewards or
                        services<br/>offered by Chronocademy.
                    </>
                }
            />
            <Box
                color="bg-gradient-to-r from-secondary-yellow-400 to-secondary-yellow-100"
                image="/buy_chronos.svg"
                title="Buy Chronos"
                body={
                    <>
                        If you do not want to teach or<br/>learn a skill, you can buy or sell<br/>Chrono credits in
                        the platform.
                    </>
                }
            />
        </div>
    </div>;

}