import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsClient } from "./client";
import { PropsWithChildren } from "react";

export default async function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <TabsClient>
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
        <TabsTrigger value="account-information">
          Account information
        </TabsTrigger>
        <TabsTrigger value="teaching-skills">Teaching skills</TabsTrigger>
        <TabsTrigger value="learning-preferences">
          Learning preferences
        </TabsTrigger>
      </TabsList>
      {children}
    </TabsClient>
  );
}
