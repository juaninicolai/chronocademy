import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className={"px-28"}>
            <div className={"flex justify-around py-4"}>
                <div className={"flex flex-col flex-1 items-start"}>
                    <h3>Quick Links</h3>
                    <ul className={"text-primary-blue-500 py-2 space-y-4"}>
                        <li><Link href={"#features"}>Features</Link></li>
                        <li><Link href={"#how-it-works"}>How it works</Link></li>
                        <li><Link href={"#faqs"}>FAQs</Link></li>
                        <li><Link href={"#about-us"}>About Us</Link></li>
                    </ul>
                </div>
                <div className={"flex flex-col flex-1 items-center"}>
                    <h3>Contact Information</h3>
                    <Link href="mailto:omi16.espi@gmail.com?subject=Contact us" className="flex items-center">
                        <Image src="/mail.svg" className="pr-2" alt="Envelope" width={40} height={40}/>
                        <p>info@chronocademy.com</p>
                    </Link>
                </div>
                <div className={"flex flex-col flex-1 items-end"}>
                    <Link href={"/"}>
                        <Image
                            src="/logo.svg"
                            alt="chronocademy logo"
                            width={140}
                            height={76}
                        />
                    </Link>
                    <h4>This website does not use cookies.</h4>
                </div>
            </div>
        </footer>
    );
}