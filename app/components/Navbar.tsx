import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return <nav>
        <div className={"flex justify-between w-full px-4"}>
            <div>
                <Image
                    src="/logo.svg"
                    alt="chronocademy logo"
                    width={140}
                    height={76}
                />
            </div>
            <div className={"flex space-x-4"}>
                <Link href={"#about"}>About us</Link>
                <Link href={"#features"}>Features</Link>
                <Link href={"#faq"}>FAQ</Link>
            </div>
        </div>
    </nav>;
}