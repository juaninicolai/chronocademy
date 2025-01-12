import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className={cn(
        "h-16",
        "flex",
        "items-center",
        "justify-between",
        "relative",
        "before:shadow-md",
        "before:inset-0",
        "before:absolute",
        "before:rotate-180",
        "before:pointer-events-none",
      )}
    >
      <div>
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
      </div>

      <Image src={Logo} alt="chronocademy logo" className="h-full" />
    </footer>
  );
}
