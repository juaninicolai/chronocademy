import { db } from "@/app/database";
import SkillsPageClient from "./skill";

export default async function SkillsPage() {
  const skills = await db
    .selectFrom("skills")
    .select(["id", "category", "skill"])
    .execute();

  const availableSkills = skills.reduce<Map<string, typeof skills>>(
    (acc, skill) => {
      const categorySkills = acc.get(skill.category) ?? []; //nullish coalesce operator
      categorySkills.push(skill);
      acc.set(skill.category, categorySkills);
      return acc;
    },
    new Map(),
  );

  return <SkillsPageClient availableSkills={availableSkills} />;
}
