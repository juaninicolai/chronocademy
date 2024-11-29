import type { Kysely } from "kysely";
import { DB } from "@/app/database";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db.deleteFrom("skills").execute();

  await db
    .insertInto("skills")
    .values([
      {
        category: "Languages",
        skill: "English",
      },
      {
        category: "Arts & Humanities",
        skill: "History",
      },
      {
        category: "Business & Marketing",
        skill: "Economics",
      },
    ])
    .execute();
}
