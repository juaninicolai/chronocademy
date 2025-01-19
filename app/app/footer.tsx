import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer
      className={cn(
        "flex",
        "justify-between",
        "relative",
        "before:shadow-md",
        "before:inset-0",
        "before:absolute",
        "before:rotate-180",
        "before:pointer-events-none",
        "pl-2",
        "py-2",
      )}
    >
      <div className="flex flex-col gap-1 items-start">
        <p className="text-base">Quick links</p>
        <Button asChild variant="link">
          <Link href="mailto:info@chronocademy.com?subject=Bug report">
            Report a bug
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="mailto:info@chronocademy.com?subject=Feature request">
            Request a feature
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/tos">Terms of Service</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/privacy">Privacy policy</Link>
        </Button>
      </div>

      <div>
        <p className="text-base">Contact support</p>
        <Button asChild variant="link">
          <Link href="mailto:support@chronocademy.com">
            <Mail /> support@chronocademy.com
          </Link>
        </Button>
      </div>

      <Link href="/" className="h-16">
        <Image src={Logo} alt="chronocademy logo" className="h-full" />
      </Link>
    </footer>
  );
}
