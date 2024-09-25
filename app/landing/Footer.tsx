import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={"px-28 py-4 sm:px-6"}>
            <div
                className={"flex flex-wrap py-4 space-y-6 sm:flex-nowrap sm:justify-around sm:space-y-4"}>
                <div className={"flex flex-col flex-1 items-center sm:items-start"}>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className={"text-primary-blue-500 py-2 space-y-4 sm:space-y-2"}>
                        <li>
                            <Link href={"#features"}>Features</Link>
                        </li>
                        <li>
                            <Link href={"#how-it-works"}>How it works</Link>
                        </li>
                        <li>
                            <Link href={"#faqs"}>FAQs</Link>
                        </li>
                        <li>
                            <Link href={"#about-us"}>About Us</Link>
                        </li>
                    </ul>
                </div>
                <div className={"flex flex-col flex-1 items-center"}>
                    <h3 className="font-semibold sm:text-lg ">Contact Information</h3>
                    <Link
                        href="mailto:info@chronocademy.com?subject=Contact us"
                        className="flex items-center mt-2"
                    >
                        <Image
                            src="/mail.svg"
                            className="h-[40px]"
                            alt="Envelope"
                            width={40}
                            height={40}
                        />
                        <p className="pl-2">info@chronocademy.com</p>
                    </Link>
                </div>
                <div className={"flex flex-col flex-1 items-center sm:items-end"}>
                    <Link href={"/"}>
                        <Image
                            src="/logo.svg"
                            alt="chronocademy logo"
                            className="h-[76px]"
                            width={140}
                            height={76}
                        />
                    </Link>
                    <h4 className="pt-2 text-center">This website does not use cookies.</h4>
                </div>
            </div>
        </footer>
    );
}