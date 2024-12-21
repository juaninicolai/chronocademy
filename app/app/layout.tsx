import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "./sidebar";

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await getServerSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
}
