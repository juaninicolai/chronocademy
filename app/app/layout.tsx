import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await getServerSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="p-4">{children}</div>
      </main>
      <Footer />
    </>
  );
}
