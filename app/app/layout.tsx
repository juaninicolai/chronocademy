import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await getServerSession(authOptions);

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
