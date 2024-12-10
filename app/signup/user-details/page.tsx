import { db } from "@/app/database";
import UserDetailsPageClient from "./user-details";

export default async function UserDetailsPage() {
  const countries = await db
    .selectFrom("countries")
    .select(["id", "country"])
    .orderBy("country", "asc")
    .execute();

  const timezones = await db
    .selectFrom("timezones")
    .select(["id", "timezone"])
    .orderBy("timezone", "asc")
    .execute();

  const languages = await db
    .selectFrom("languages")
    .select(["id", "language"])
    .orderBy("language", "asc")
    .execute();

  return (
    <UserDetailsPageClient
      availableCountries={countries}
      availableTimezones={timezones}
      availableLanguages={languages}
    />
  );
}
