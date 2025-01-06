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
  languages: {
    language: string;
    level: string;
  }[];
  teachingSkills: {
    skill: string;
  }[];
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
      description:
        "This is Veselin's description. It is a longer description. Yes, a very very very very very long description!!! Even longer than I was expecting it to have to be. How long does it have to be... for god's sake.",
      originCountry: "Bulgaria",
      languages: [
        { language: "English", level: "advanced" },
        { language: "Bulgarian", level: "native" },
        { language: "Russian", level: "beginner" },
        { language: "Sign", level: "beginner" },
      ],
      teachingSkills: [
        { skill: "English" },
        { skill: "Architecture" },
        { skill: "Engineering" },
      ],
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
      languages: [
        { language: "Spanish", level: "native" },
        { language: "English", level: "advanced" },
      ],
      teachingSkills: [
        { skill: "Spanish" },
        { skill: "History" },
        { skill: "Marketing" },
        { skill: "UX/UI Design" },
      ],
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

    const languagesPromise =
      user.languages.length > 0
        ? db
            .selectFrom("languages")
            .select(["id", "language"])
            .where(
              "language",
              "in",
              user.languages.map(({ language }) => language),
            )
            .execute()
        : Promise.resolve([]);

    const teachingSkillsPromise =
      user.teachingSkills.length > 0
        ? db
            .selectFrom("skills")
            .select(["id", "skill"])
            .where(
              "skill",
              "in",
              user.teachingSkills.map(({ skill }) => skill),
            )
            .execute()
        : Promise.resolve([]);

    const userId = await userIdPromise;
    const timezoneId = await timezoneIdPromise;
    const countryId = await countryIdPromise;
    const languages = await languagesPromise;
    const teachingSkills = await teachingSkillsPromise;

    const insertPromises = [];

    insertPromises.push(
      db
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
        .execute(),
    );

    if (user.languages.length > 0) {
      insertPromises.push(
        db
          .insertInto("user_languages")
          .values(
            user.languages.map((userLanguage) => ({
              user_id: userId,
              language_id: languages.find(
                (language) => language.language === userLanguage.language,
              )?.id,
              level: userLanguage.level,
            })),
          )
          .execute(),
      );
    }

    if (user.teachingSkills.length > 0) {
      insertPromises.push(
        db
          .insertInto("user_skills")
          .values(
            user.teachingSkills.map((userTeachingSkill) => ({
              type: "teach",
              user_id: userId,
              skill_id: teachingSkills.find(
                (teachingSkills) =>
                  teachingSkills.skill === userTeachingSkill.skill,
              )?.id,
            })),
          )
          .execute(),
      );
    }

    await Promise.all(insertPromises);
  }
}
