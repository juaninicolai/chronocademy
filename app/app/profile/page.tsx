import { redirect } from "next/navigation";

export default async function ProfilePage() {
  redirect("/app/profile/account-information");
}
