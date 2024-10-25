import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();

  return <h1>Hello, {session.user?.name}</h1>;
  // <h1>Hello, Omar! You&apos;re gay!</h1>;
}
