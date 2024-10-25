import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "./session";
import { AppSidebar } from "./sidebar";

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await getServerSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </SessionProvider>
    </>
  );
}
