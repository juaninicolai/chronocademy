import Image from "next/image";
import React from "react";
import classNames from "classnames";
import CTA from "@/app/components/CTA";

export default function AboutUs() {
    return (
        <div
            id={"about-us"}
            className={"flex flex-col py-16 bg-gradient-to-r from-primary-blue-100 to-primary-blue-200"}
        >
            <div className={"text-center"}>
                <h1
                    className={"font-inter text-4xl text-secondary-black-500 text-center font-extrabold"}>
                    About us
                </h1>
                <h2 className="font-roboto text-h2 py-4 text-center">
                    Discover what inspires our journey and drives us
                </h2>
            </div>
            <div className={"flex flex-wrap justify-center gap-10 pt-8"}>
                <div
                    className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg bg-gradient-to-r from-primary-orange-100 to-primary-orange-400 w-full max-w-sm`}
                >
                    <div className={"flex items-center gap-3"}>
                        <Image
                            src={"/earn_chrono.svg"}
                            alt={"our mission icon"}
                            className="h-[40px]"
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
                        className="h-[200px] py-4"
                        width={256}
                        height={200}
                    />
                    <p id={"box-body"} className={"text-lg"}>
                        &nbsp;&nbsp;&nbsp;At Chronocademy, we believe in making education accessible to everyone,
                        regardless of their financial situation or location. <br/>
                        &nbsp;&nbsp;&nbsp;Our mission is to create a global community where people can freely exchange
                        skills, knowledge, and experiences
                        through a unique time-based currency system called Chrono. <br/>&nbsp;&nbsp;&nbsp;We aim to
                        empower individuals to learn and teach at their
                        own pace, fostering a culture of lifelong learning, personal growth, and mutual support.
                    </p>
                </div>
                <div
                    className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg bg-gradient-to-r from-secondary-yellow-100 to-secondary-yellow-400 w-full max-w-sm`}
                >
                    <div className={"flex items-center gap-3"}>
                        <Image
                            src={"/devices.svg"}
                            alt={"devices icon"}
                            className="h-[40px]"
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
                        className="h-[200px] py-4"
                        width={256}
                        height={200}
                    />
                    <p id={"box-body"} className={"text-lg"}>
                        &nbsp;&nbsp;&nbsp;We envision a world where learning and teaching are not just affordable, but
                        also universally accessible and deeply rewarding for everyone. <br/>
                        &nbsp;&nbsp;&nbsp;By breaking down financial barriers, we aim to help people from all
                        backgrounds to grow, share their expertise, and collaborate across borders. <br/>
                        &nbsp;&nbsp;&nbsp;Our vision is to foster a culture of lifelong learning, driven by passion and
                        curiosity, and to create a global community connected through the
                        exchange of knowledge and skills.
                    </p>
                </div>
                <div
                    className={`flex flex-col gap-3 p-12 flex-1 items-center rounded-lg bg-gradient-to-r from-primary-green-100 to-primary-green-400 w-full max-w-sm`}
                >
                    <div className={"flex items-center gap-3"}>
                        <Image
                            src={"/our_values.svg"}
                            alt={"our values icon"}
                            className="h-[40px]"
                            width={40}
                            height={40}
                        />
                        <p id={"box-title"} className={"text-xl font-bold"}>
                            Our Values
                        </p>
                    </div>
                    <Image
                        src={"/our_values_image.svg"}
                        alt={"our values image"}
                        className="h-[200px] py-4"
                        width={256}
                        height={200}
                    />
                    <ul id={"box-body"} className={classNames("text-lg", "list-disc")}>
                        <li>Accessibility: Making learning and teaching available to everyone, regardless of financial
                            status.<br/><br/></li>
                        <li>Community: Building strong connections between learners and teachers around the
                            globe.<br/><br/></li>
                        <li>Innovation: Continuously improving our platform to meet the needs of our users.<br/><br/>
                        </li>
                        <li>Quality: Ensuring high standards for both our platform services and lessons.<br/><br/></li>
                    </ul>
                </div>
            </div>
            <div className={"flex justify-center p-6"}>
                <CTA/>
            </div>
        </div>
    );
}
