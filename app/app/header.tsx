"use client";

import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  const session = useSession({ required: true });

  return (
    <header
      className={cn(
        "h-16",
        "flex",
        "items-center",
        "justify-between",
        "pr-2",
        "shadow-md",
      )}
    >
      <Link href="/" className="h-full">
        <Image src={Logo} alt="chronocademy logo" className="h-full" />
      </Link>

      <div className="flex gap-4">
        <p className="leading-loose">
          {session.status === "loading" ? (
            <Skeleton />
          ) : (
            session.data.user?.name
          )}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUser />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
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
