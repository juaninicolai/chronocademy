"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Box from "@/app/landing/Box";

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const boxes = [
    {
      color: "bg-gradient-to-r from-primary-blue-100 to-primary-blue-400",
      image: "/earn_chrono.svg",
      title: "Earn Chronos",
      body: (
        <>
          Use some of your time to <span className="font-bold">teach</span> any of your skills to someone else or{" "}
          <span className="font-bold">refer</span> us to a friend and earn Chrono credits for it.
        </>
      ),
    },
    {
      color: "bg-gradient-to-r from-primary-green-100 to-primary-green-400",
      image: "/spend_chronos.svg",
      title: "Spend Chronos",
      body: (
        <>
          Use your Chrono credits to <span className="font-bold">learn</span> a skill from someone else or to{" "}
          <span className="font-bold">unlock rewards or services</span> offered by Chronocademy.
        </>
      ),
    },
    {
      color: "bg-gradient-to-r from-secondary-yellow-100 to-secondary-yellow-400",
      image: "/buy_chronos.svg",
      title: "Trade Chronos",
      body: (
        <>
          If you do not want or do not have time to teach or learn a skill, you can{" "}
          <span className="font-bold">buy or sell</span> Chrono credits on the platform.
        </>
      ),
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's `sm:` breakpoint is 640px
    };

    handleResize(); // Call once to initialize
    window.addEventListener("resize", handleResize); // Add listener for window resizing
    return () => window.removeEventListener("resize", handleResize); // Clean up the listener
  }, []);

  const nextSlide = () => {
    if (currentIndex < boxes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div id="how-it-works" className="flex flex-col justify-center items-center sm:py-16">
      <h1 className="font-inter sm:text-4xl text-secondary-black-500 font-extrabold">
        How It Works
      </h1>
      <h2 className="font-roboto text-h2 py-4 text-center">
        Explore the various ways to use your Chrono credits and maximize your experience.
      </h2>

      {/* Mobile Carousel */}
      {isMobile ? (
        <div className="relative flex items-center justify-center w-full max-w-3xl h-[350px] mb-8 sm:mb-4">
          {/* Left Arrow */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 text-4xl text-gray-500 hover:text-gray-900"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <IoIosArrowBack />
            </button>
          )}

          {/* Box */}
          <div className="w-[85%] flex justify-center mx-auto"> {/* Setting width to 93% for mobile */}
            <Box
              color={boxes[currentIndex].color}
              image={boxes[currentIndex].image}
              title={boxes[currentIndex].title}
              body={boxes[currentIndex].body}
            />
          </div>

          {/* Right Arrow */}
          {currentIndex < boxes.length - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 text-4xl text-gray-500 hover:text-gray-900"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <IoIosArrowForward />
            </button>
          )}
        </div>
      ) : (
        /* Desktop View */
        <div className="flex flex-wrap justify-center gap-10 pt-8">
          {boxes.map((box, index) => (
            <div key={index} className="w-full sm:w-[30%]"> {/* Full width for mobile, smaller for desktop */}
              <Box
                color={box.color}
                image={box.image}
                title={box.title}
                body={box.body}
                className="w-full" // Full width for desktop view
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
