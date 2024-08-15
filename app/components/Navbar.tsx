import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return <nav>
        <div className={"flex justify-between w-full px-8 pl-28 pr-28"}>
            <div>
                <Image
                    src="/logo.svg"
                    alt="chronocademy logo"
                    width={140}
                    height={76}
                />
            </div>
            <div id={"nav-links"} className={"flex space-x-4 items-center"}>
                <Link href={"#how-it-works"}>How it works</Link>
                <Link href={"#faq"}>FAQ</Link>
                <Link href={"#about"}>About us</Link>
            </div>
        </div>
    </nav>;
}