import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col px-4 py-8 min-h-[48rem]">
        {children}
      </main>
      <Footer />
    </>
  );
}
