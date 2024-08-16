import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function Hero() {
    return (
        <div id={"hero-section"}
             className={"flex justify-between bg-gradient-to-r from-primary-orange-200 to-primary-orange-400"}>
            <div id={"hero-text"} className={"flex flex-col justify-center pl-28 space-y-8 py-20"}>
                <h3 className={"font-roboto text-2xl"}>The platform where time becomes knowledge</h3>
                <h1 className={"text-6xl font-bold"}>Transform the way <br/>you <span
                    className={"text-primary-blue-300"}>learn & teach</span></h1>
                <p className={"font-roboto text-2xl"}>Earn time credits by teaching, spend them to learn. <br/>No money
                    needed.</p>
                <div className={"space-y-2"}>
                    <div className={"flex space-x-2"}>
                        <input className={"p-4 rounded-lg"}
                               type={"text"}
                               placeholder={"Enter your name"}
                        />
                        <input
                            className={"p-4 rounded-lg"}
                            type={"email"}
                            placeholder={"Enter your email"}
                        />
                        <button
                            className={"bg-primary-blue-500 text-secondary-white-500 font-roboto text-xl p-4 rounded-lg flex items-center space-x-2"}>
                            Join the waiting list <FaArrowRight className={"ml-2"}/>
                        </button>
                    </div>
                    <div className={"flex justify-center"}>
                        <p id={"info-disclaimer"}>We&apos;ll never share your info with anyone.</p>
                    </div>
                </div>
            </div>
            <div id={"hero-image"} className={"py-20"}>
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