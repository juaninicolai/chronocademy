import Image from "next/image";
import CTA from "@/app/components/CTA";

export default function Hero() {
  return (
    <div
      id={"hero-section"}
      className={
        "flex justify-between bg-gradient-to-r from-primary-orange-200 to-primary-orange-400"
      }
    >
      <div
        id={"hero-text"}
        className={"flex flex-col justify-center pl-28 space-y-8 pt-20 pb-19"}
      >
        <h3 className={"font-roboto text-2xl"}>
          The platform where time becomes knowledge
        </h3>
        <h1 className={"text-6xl font-bold"}>
          Transform the way <br />
          you <span className={"text-primary-blue-300"}>learn & teach</span>
        </h1>
        <p className={"font-roboto text-2xl"}>
          Earn time credits by teaching, spend them to learn. <br />
          No money needed .
        </p>
        <CTA />
      </div>
      <div id={"hero-image"} className={"py-20 pb-19"}>
        <Image
          src="/hero.svg"
          alt="chronocademy illustration for hero section"
          width={490}
          height={416}
        />
      </div>
    </div>
  );
}
