import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { AccountInformationClient } from "./client";
import { db } from "@/app/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    .selectFrom("user_data")
    .select([
      "first_name",
      "last_name",
      "user_data.birthdate",
      "origin_country",
      "description",
    ])
    .where("user_id", "=", user.id!)
    .executeTakeFirstOrThrow();

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
            firstName: defaultValues.first_name,
            lastName: defaultValues.last_name,
            birthdate: defaultValues.birthdate,
            countryOfBirth: defaultValues.origin_country.toString(),
            profileDescription: defaultValues.description,
          }}
        />
      </Card>
    </TabsContent>
  );
}
