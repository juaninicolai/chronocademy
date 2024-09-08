"use client"

import { FaArrowRight } from "react-icons/fa";
import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/app/firebase/firestore";

export default function CTA() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "potential_users"), { name, email });
            alert("You have been added to the waiting list!");
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error("Error adding document: ", error);
        }
        setName("");
        setEmail("");
    }

    return <div className={"space-y-2"}>
        <h3>Join the waiting list to be an early adopter!</h3>
        <form className={"flex space-x-2"} onSubmit={handleSubmit}>
            <input className={"p-4 rounded-lg"}
                   type={"text"}
                   placeholder={"Enter your name"}
                   value={name}
                   onChange={(e) => setName(e.target.value)}
            />
            <input
                className={"p-4 rounded-lg"}
                type={"email"}
                placeholder={"Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className={"bg-primary-blue-500 text-secondary-white-500 font-roboto text-xl p-4 rounded-lg flex items-center space-x-2"}
                type={"submit"}
            >
                Join the waiting list <FaArrowRight className={"ml-2"}/>
            </button>
        </form>
        <div className={"flex"}>
            <p id={"info-disclaimer"}>Your information is safe with us.</p>
        </div>
    </div>;
}