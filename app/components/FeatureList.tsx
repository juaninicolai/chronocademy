import ListItem from "@/app/components/ListItem";
import React from "react";

export default function FeatureList() {
    return <div>
        <ul className={"flex justify-around py-1"}>
            <ListItem src={"/skills_exchange.svg"} alt={"skills icon"} text={"Skill Exchange"}/>
            <ListItem src={"/google_meet.svg"} alt={"google meet icon"} text={"Google Meet Integration"}/>
            <ListItem src={"/chrono_wallet.svg"} alt={"chrono wallet icon"} text={"Chrono Wallet"}/>
            <ListItem src={"/flexible_payments.svg"} alt={"flexible payments icon"} text={"Flexible Payments"}/>
        </ul>
    </div>;
}