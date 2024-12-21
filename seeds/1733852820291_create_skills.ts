import { DB } from "@/app/database";
import type { Kysely } from "kysely";

export async function seed(db: Kysely<DB>): Promise<void> {
  const skillsByCategory = {
    Languages: [
      "Arabic",
      "English",
      "French",
      "German",
      "Italian",
      "Japanese",
      "Mandarin Chinese",
      "Portuguese",
      "Russian",
      "Spanish",
    ],
    "Arts and Humanities": [
      "Architecture",
      "Art",
      "History",
      "Music",
      "Photography",
    ],

    "Business and Marketing": [
      "Economics",
      "Entrepreneurship",
      "Graphic Design",
      "Marketing",
      "UX/UI Design",
    ],

    "Science, Technology, Engineering, and Mathematics (STEM)": [
      "Cybersecurity",
      "Engineering",
      "Machine Learning",
      "Mathematics",
      "Programming",
    ],

    "Social Sciences": ["Psychology"],

    "Health and Fitness": ["Fitness/Personal Training"],

    "Culinary Arts": ["Cooking"],
  };

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
