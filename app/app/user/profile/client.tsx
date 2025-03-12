"use client";

import { Tabs } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export function TabsClient({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const tabKeyMatches = /(\/app\/user\/profile)\/(.+)\/?/.exec(pathname);
  const pathnameWithoutTabKey = tabKeyMatches?.[1];
  const tabKey = tabKeyMatches?.[2];

  return (
    <Tabs
      value={tabKey}
      onValueChange={(value) => {
        const url = new URL(location.href);
        url.pathname = `${pathnameWithoutTabKey}/${value}`;
        router.push(url.toString());
      }}
    >
      {children}
    </Tabs>
  );
}
