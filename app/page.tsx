import { LandingPage } from "./landing";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <LandingPage />
      <Link href="/signup">Go to Signup</Link>
    </>
  );
}
