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
      <main className="flex-1 px-4 py-8">{children}</main>
      <Footer />
    </>
  );
}
