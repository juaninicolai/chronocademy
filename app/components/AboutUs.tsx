import Image from "next/image";
import React from "react";
import CTA from "@/app/components/CTA";
import classNames from "classnames";

export default function AboutUs() {
  return (
    <div
      id={"about-us"}
      className={
        "px-28 py-4 bg-gradient-to-r from-primary-blue-100 to-primary-blue-200"
      }
    >
      <div className={"text-center"}>
        <h1
          className={
            "font-inter text-4xl text-secondary-black-500 py-4 text-center font-extrabold"
          }
        >
          About us
        </h1>
        <h2 className="font-roboto text-h2 py-4 text-center">
          Get to know us better
        </h2>
      </div>
      <div className={"flex justify-around py-4"}>
        <div
          className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg bg-gradient-to-r from-primary-orange-100 to-primary-orange-400 w-full max-w-sm`}
        >
          <div className={"flex items-center gap-3"}>
            <Image
              src={"/earn_chrono.svg"}
              alt={"our mission icon"}
              width={40}
              height={40}
            />
            <p id={"box-title"} className={"text-xl font-bold"}>
              Our Mission
            </p>
          </div>
          <Image
            src={"/about_us.svg"}
            alt={"our mission image"}
            width={256}
            height={200}
          />
          <p id={"box-body"} className={"text-lg"}>
            At Chronocademy, we believe in making education accessible to
            everyone. Our mission is to create a global community where people
            can freely exchange skills, knowledge, and experiences through a
            unique time-based currency system called Chrono.
          </p>
        </div>
        <div
          className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg bg-gradient-to-r from-secondary-yellow-100 to-secondary-yellow-400 w-full max-w-sm`}
        >
          <div className={"flex items-center gap-3"}>
            <Image
              src={"/devices.svg"}
              alt={"devices icon"}
              width={40}
              height={40}
            />
            <p id={"box-title"} className={"text-xl font-bold"}>
              Our Vision
            </p>
          </div>
          <Image
            src={"/our_vision.svg"}
            alt={"devices image"}
            width={256}
            height={200}
          />
          <p id={"box-body"} className={"text-lg"}>
            We envision a world where learning and teaching are seamless,
            affordable, and rewarding for everyone. By breaking down financial
            barriers, we empower individuals to grow and share their expertise,
            fostering a culture of lifelong learning.
          </p>
        </div>
        <div
          className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg bg-gradient-to-r from-primary-green-100 to-primary-green-400 w-full max-w-sm`}
        >
          <div className={"flex items-center gap-3"}>
            <Image
              src={"/our_values.svg"}
              alt={"our values icon"}
              width={40}
              height={40}
            />
            <p id={"box-title"} className={"text-xl font-bold"}>
              Our Vision
            </p>
          </div>
          <Image
            src={"/our_values_image.svg"}
            alt={"our values image"}
            width={256}
            height={200}
          />
          <ul id={"box-body"} className={classNames("text-lg", "list-disc")}>
            <li>
              Accessibility: We aim to make learning and teaching available to
              everyone, regardless of financial status.
            </li>
            <li>
              Community: Building strong connections between learners and
              teachers around the globe.
            </li>
            <li>
              Innovation: Continuously evolving our platform to meet the needs
              of our users.
            </li>
            <li>
              Quality: Ensuring that every learning experience is valuable and
              enriching.
            </li>
          </ul>
        </div>
      </div>
      <div className={"flex justify-center"}>
        <CTA />
      </div>
    </div>
  );
}
