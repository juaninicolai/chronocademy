import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { SignUpFormStateProvider } from "./form-state";
import { authOptions } from "@/app/api/auth/[...nextauth]";

// TODO: Figure out how to protect routes based on user role in a more generic way
export default async function SignUpLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session !== null) {
    redirect("/app");
  }

  return (
    <div className="absolute inset-0">
      <SignUpFormStateProvider>{children}</SignUpFormStateProvider>;
    </div>
  );
}
