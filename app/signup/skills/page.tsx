import { db } from "@/app/database";
import SkillsPageClient from "./skills";

export default async function SkillsPage() {
  const skills = await db
    .selectFrom("skills")
    .select(["id", "category", "skill"])
    .execute();

  return <SkillsPageClient availableSkills={skills} />;
}
