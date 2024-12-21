"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function ProfileCardsGrid({ children }: PropsWithChildren) {
  const sidebar = useSidebar();

  return (
    <div
      className={cn(
        "grid",
        "gap-4",
        "grid-cols-1",
        "sm:grid-cols-2",
        {
          "md:grid-cols-2": sidebar.open,
          "md:grid-cols-3": !sidebar.open,
        },
        {
          "xl:grid-cols-3": sidebar.open,
          "xl:grid-cols-4": !sidebar.open,
        },
        {
          "2xl:grid-cols-4": sidebar.open,
          "2xl:grid-cols-5": !sidebar.open,
        },
      )}
    >
      {children}
    </div>
  );
}
