"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import classNames from "classnames";
import CTA from "@/app/components/CTA";

export default function AboutUs() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const boxes = [
    {
      color: "bg-gradient-to-r from-primary-orange-100 to-primary-orange-400",
      icon: "/earn_chrono.svg",
      image: "/about_us.svg",
      title: "Our Mission",
      body: (
        <>
          &nbsp;&nbsp;&nbsp;At Chronocademy, we believe in making education
          accessible to everyone, regardless of their financial situation or
          location. <br />
          &nbsp;&nbsp;&nbsp;Our mission is to create a global community where
          people can freely exchange skills, knowledge, and experiences through
          a unique time-based currency system called Chrono. <br />
          &nbsp;&nbsp;&nbsp;We aim to empower individuals to learn and teach at
          their own pace, fostering a culture of lifelong learning, personal
          growth, and mutual support.
        </>
      ),
    },
    {
      color:
        "bg-gradient-to-r from-secondary-yellow-100 to-secondary-yellow-400",
      icon: "/devices.svg",
      image: "/our_vision.svg",
      title: "Our Vision",
      body: (
        <>
          &nbsp;&nbsp;&nbsp;We envision a world where learning and teaching are
          not just affordable, but also universally accessible and deeply
          rewarding for everyone. <br />
          &nbsp;&nbsp;&nbsp;By breaking down financial barriers, we aim to help
          people from all backgrounds grow, share their expertise, and
          collaborate across borders. <br />
          &nbsp;&nbsp;&nbsp;Our vision is to foster a culture of lifelong
          learning, driven by passion and curiosity, and to create a global
          community connected through the exchange of knowledge and skills.
        </>
      ),
    },
    {
      color: "bg-gradient-to-r from-primary-green-100 to-primary-green-400",
      icon: "/our_values.svg",
      image: "/our_values_image.svg",
      title: "Our Values",
      body: (
        <ul className={classNames("text-lg", "list-disc")}>
          <li>
            Accessibility: Making learning and teaching available to everyone,
            regardless of financial status.
            <br />
            <br />
          </li>
          <li>
            Community: Building strong connections between learners and teachers
            around the globe.
            <br />
            <br />
          </li>
          <li>
            Innovation: Continuously improving our platform to meet the needs of
            our users.
            <br />
            <br />
          </li>
          <li>
            Quality: Ensuring high standards for both our platform services and
            lessons.
            <br />
            <br />
          </li>
        </ul>
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
    <div
      id={"about-us"}
      className={
        "flex flex-col py-16 bg-gradient-to-r from-primary-blue-100 to-primary-blue-200"
      }
    >
      <div className={"text-center"}>
        <h1
          className={
            "font-inter sm:text-4xl text-secondary-black-500 text-center font-extrabold"
          }
        >
          About us
        </h1>
        <h2 className="font-roboto text-h2 py-4 text-center">
          Discover what inspires our journey and drives us
        </h2>
      </div>

      {/* Mobile Carousel */}
      {isMobile ? (
        <div className="relative flex items-center justify-center w-full max-w-3xl">
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
          <div className="w-[85%] flex justify-center mx-auto">
            {" "}
            {/* Adjusting width for mobile */}
            <div
              className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg ${boxes[currentIndex].color} w-full max-w-sm`}
            >
              <div className={"flex items-center gap-3"}>
                <Image
                  src={boxes[currentIndex].icon}
                  alt={`${boxes[currentIndex].title} icon`}
                  className="h-[40px]"
                  width={40}
                  height={40}
                />
                <p className={"text-xl font-bold"}>
                  {boxes[currentIndex].title}
                </p>
              </div>
              <Image
                src={boxes[currentIndex].image}
                alt={`${boxes[currentIndex].title} image`}
                className="h-[200px] py-4"
                width={256}
                height={200}
              />
              <div className={"text-lg"}>{boxes[currentIndex].body}</div>
            </div>
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
        <div className={"flex flex-wrap justify-center gap-10 pt-8"}>
          {boxes.map((box, index) => (
            <div
              key={index}
              className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg ${box.color} w-full max-w-sm`}
            >
              <div className={"flex items-center gap-3"}>
                <Image
                  src={box.icon}
                  alt={`${box.title} icon`}
                  className="h-[40px]"
                  width={40}
                  height={40}
                />
                <p className={"text-xl font-bold"}>{box.title}</p>
              </div>
              <Image
                src={box.image}
                alt={`${box.title} image`}
                className="h-[200px] py-4"
                width={256}
                height={200}
              />
              <div className={"text-lg"}>{box.body}</div>
            </div>
          ))}
        </div>
      )}

      <div className={"flex justify-center p-6"}>
        <CTA />
      </div>
    </div>
  );
}
