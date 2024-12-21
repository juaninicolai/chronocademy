import { DB } from "@/app/database";
import type { Kysely } from "kysely";
import { hash } from "bcrypt";

type User = {
  email: string;
  password: string;
  birthdate: Date;
  lastName: string;
  timezone: string;
  firstName: string;
  description: string;
  originCountry: string;
};

export async function seed(db: Kysely<DB>): Promise<void> {
  const users: User[] = [
    {
      email: "veselinivanov@seed.com",
      password: "veselinivanov",
      birthdate: new Date(Date.UTC(1998, 5, 25)),
      lastName: "Ivanov",
      timezone: "Europe/Copenhagen",
      firstName: "Veselin",
      description: "This is Veselin's description",
      originCountry: "Bulgaria",
    },
    {
      email: "juaninicolai@seed.com",
      password: "juaninicolai",
      birthdate: new Date(Date.UTC(1997, 4, 24)),
      lastName: "Nicolai",
      timezone: "America/Argentina/Cordoba",
      firstName: "Juani",
      description: "This is Juan's description",
      originCountry: "Argentina",
    },
  ];

  for (const user of users) {
    const userIdPromise = (async () =>
      db
        .insertInto("users")
        .values({
          email: user.email,
          password: await hash(user.password, 1),
        })
        .returning("id")
        .executeTakeFirstOrThrow()
        .then(({ id }) => id))();

    const timezoneIdPromise = db
      .selectFrom("timezones")
      .select("id")
      .where("timezone", "=", user.timezone)
      .executeTakeFirstOrThrow()
      .then(({ id }) => id);

    const countryIdPromise = db
      .selectFrom("countries")
      .select("id")
      .where("country", "=", user.originCountry)
      .executeTakeFirstOrThrow()
      .then(({ id }) => id);

    const userId = await userIdPromise;
    const timezoneId = await timezoneIdPromise;
    const countryId = await countryIdPromise;

    await db
      .insertInto("user_data")
      .values({
        user_id: userId,
        birthdate: user.birthdate,
        last_name: user.lastName,
        timezone: timezoneId,
        first_name: user.firstName,
        description: user.description,
        origin_country: countryId,
      })
      .execute();
  }
}
