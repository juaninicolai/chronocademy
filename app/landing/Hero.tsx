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
                <h1 className="text-4xl sm:text-6xl font-bold">
                    Transform the way <br />
                    you <span className="text-primary-blue-300">learn and teach</span>
                </h1>
                <p className="font-roboto text-lg sm:text-2xl">
                Chronocademy - The Ultimate Skill Exchange Platform. <br />
                    Earn time credits by teaching, spend them to learn. 
                </p>
                <CTA />
            </div>

            {/* Image Section (Hidden on Mobile) */}
            <div id="hero-image" className="hidden sm:block py-20">
                <Image
                    src="/hero.svg"
                    alt="Online education platform"
                    className="h-[416px]"
                    width={490}
                    height={416}
                    priority
                />
            </div>
        </div>
    );
}
