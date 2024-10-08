import Image from "next/image";
import CTA from "@/app/components/CTA";

export default function Hero() {
  return (
    <div
      id="hero-section"
      className="flex flex-col sm:flex-row justify-between bg-gradient-to-r from-primary-orange-200 to-primary-orange-400 py-20"
    >
      {/* Text Section */}
      <div
        id="hero-text"
        className="flex flex-col justify-center space-y-6 sm:space-y-8 px-6 sm:pl-28"
      >
        <h3 className="font-roboto text-xl sm:text-2xl">
          The platform where time becomes knowledge
        </h3>
        <h1 className="text-4xl sm:text-6xl font-bold">
          Transform the way <br />
          you <span className="text-primary-blue-300">learn & teach</span>
        </h1>
        <p className="font-roboto text-lg sm:text-2xl">
          Earn time credits by teaching, spend them to learn. <br />
          No money needed.
        </p>
        <CTA />
      </div>

      {/* Image Section (Hidden on Mobile) */}
      <div id="hero-image" className="hidden sm:block py-20">
        <Image
          src="/hero.svg"
          alt="chronocademy illustration for hero section"
          className="h-[416px]"
          width={490}
          height={416}
          priority
        />
      </div>
    </div>
  );
}
