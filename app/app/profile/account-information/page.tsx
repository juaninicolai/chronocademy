import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { AccountInformationClient } from "./client";
import { db } from "@/app/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { jsonArrayFrom } from "kysely/helpers/postgres";

export default async function AccountInformationPage() {
  const availableCountries = await db
    .selectFrom("countries")
    .select(["id", "country"])
    .orderBy("country", "asc")
    .execute();

  const availableTimezones = await db
    .selectFrom("timezones")
    .select(["id", "timezone"])
    .orderBy("timezone", "asc")
    .execute();

  const availableLanguages = await db
    .selectFrom("languages")
    .select(["id", "language"])
    .orderBy("language", "asc")
    .execute();

  const user = (await getServerSession(authOptions))!.user!;

  const defaultValues = await db
    .selectFrom("users")
    .innerJoin("user_data", "user_data.user_id", "users.id")
    .select((eb) => [
      "user_data.first_name",
      "user_data.last_name",
      "user_data.birthdate",
      "user_data.origin_country",
      "user_data.description",
      jsonArrayFrom(
        eb
          .selectFrom("user_languages")
          .select(["language_id", "level"])
          .where("user_id", "=", user.id!),
      ).as("languages"),
    ])
    .where("users.id", "=", user.id!)
    .executeTakeFirstOrThrow();

  const picture = await db
    .selectFrom("user_pictures")
    .where("user_id", "=", user.id)
    .executeTakeFirst();

  return (
    <TabsContent value="account-information">
      <Card>
        <CardHeader>
          <CardTitle>Account information</CardTitle>
        </CardHeader>
        <AccountInformationClient
          availableCountries={availableCountries}
          availableTimezones={availableTimezones}
          availableLanguages={availableLanguages}
          defaultValues={{
            picture: null,
            firstName: defaultValues.first_name,
            lastName: defaultValues.last_name,
            birthdate: defaultValues.birthdate,
            countryOfBirth: defaultValues.origin_country.toString(),
            profileDescription: defaultValues.description,
            languages: defaultValues.languages.map((language) => ({
              language: language.language_id.toString(),
              languageLevel: language.level,
            })),
          }}
          defaultPictureUrl={
            picture !== undefined ? `/app/profile/picture/${user.id}` : null
          }
        />
      </Card>
    </TabsContent>
  );
}
