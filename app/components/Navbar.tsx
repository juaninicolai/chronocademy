import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return <nav>
        <h1>Chronocademy</h1>
        <Link href={"/about"}>About us</Link>
        <Link href={"/features"}>Features</Link>
        <Link href={"/faq"}>FAQ</Link>
        <Image
            src="/logo.svg"
            alt="chronocademy logo"
            width={140}
            height={76}
        />
    </nav>;
}