"use client";
import { SessionProvider, useSession } from "next-auth/react";
export { SessionProvider };

export function useAuthenticatedSession() {
  const session = useSession();

  // NOTE: Does this stay authenticated forever on the client?
  if (session.status !== "authenticated") {
    throw new Error(
      "useAuthenticatedSession is expected to be used when authenticated",
    );
  }

  return session.data;
}
