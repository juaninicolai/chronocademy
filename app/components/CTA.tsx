"use client";

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
    };

    return (
        <div className="space-y-4">
            <h4 className="text-lg sm:text-xl">
                Join our waitlist for early access and updates on Chronocademy’s launch.
            </h4>
            <form
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2"
                onSubmit={handleSubmit}
            >
                <input
                    className="p-4 w-full rounded-lg border border-gray-300"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="p-4 w-full rounded-lg border border-gray-300"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="bg-primary-blue-500 text-secondary-white-500 font-roboto text-xl p-4 rounded-lg flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto"
                    type="submit"
                >
                    Join the waiting list <FaArrowRight className="ml-2" />
                </button>
            </form>
            <div className="rounded-lg">
                <p id="info-disclaimer" className="text-gray-500 text-sm">
                    Your information is safe with us.
                </p>
            </div>
        </div>
    );
}