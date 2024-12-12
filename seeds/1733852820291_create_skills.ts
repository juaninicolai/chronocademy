import { DB } from "@/app/database";
import type { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {
  const skillsByCategory = {
    Languages: [
      "English",
      "Spanish",
      "French",
      "Mandarin Chinese",
      "German",
      "Japanese",
      "Italian",
      "Arabic",
      "Portuguese",
      "Russian",
    ],
    "Arts and Humanities": [
      "History",
      "Art",
      "Music",
      "Photography",
      "Architecture",
    ],

    "Business and Marketing": [
      "Marketing",
      "Economics",
      "Entrepreneurship",
      "UX/UI Design",
      "Graphic Design",
    ],

    "Science, Technology, Engineering, and Mathematics (STEM)": [
      "Mathematics",
      "Programming",
      "Machine Learning",
      "Cybersecurity",
      "Engineering",
    ],

    "Social Sciences": ["Psychology"],

    "Health and Fitness": ["Fitness/Personal Training"],

    "Culinary Arts": ["Cooking"],
  };

  await db.deleteFrom("skills").execute();

  await db
    .insertInto("skills")
    .values(
      Object.entries(skillsByCategory).flatMap(([category, skills]) =>
        skills.map((skill) => ({
          category,
          skill,
        })),
      ),
    )
    .execute();
}
