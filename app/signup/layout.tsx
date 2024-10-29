import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

// TODO: Figure out how to protect routes based on user role in a more generic way
export default async function SignUpLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (session !== null) {
    redirect("/app");
  }

  return children;
}
