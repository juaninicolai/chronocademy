"use client";

import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { CircleHelp, CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
  const session = useSession({ required: true });
  const router = useRouter();

  return (
    <header
      className={cn(
        "bg-white",
        "h-16",
        "flex",
        "items-center",
        "justify-between",
        "pr-2",
        "shadow",
      )}
    >
      <Link href="/app" className="h-full">
        <Image src={Logo} alt="chronocademy logo" className="h-full" />
      </Link>

      <div className="flex gap-4">
        <Button asChild variant="ghost" size="icon" className="[&_svg]:size-7">
          <Link href="/#faqs">
            <CircleHelp size={30} />
          </Link>
        </Button>

        <p className="leading-loose text-base">
          {session.status === "loading" ? (
            <Skeleton />
          ) : (
            session.data.user?.name
          )}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUser size={30} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => router.push("/app/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                signOut({
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
