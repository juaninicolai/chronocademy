import { db } from "@/app/database";
import { TeachingSkillsClient } from "./client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default async function TeachingSkillsPage() {
  const availableSkills = db
    .selectFrom("skills")
    .select(["id", "category", "skill"])
    .orderBy("category", "asc")
    .orderBy("skill", "asc")
    .execute()
    .then((skills) =>
      skills.reduce<Map<string, typeof skills>>((acc, skill) => {
        const categorySkills = acc.get(skill.category) ?? [];
        categorySkills.push(skill);
        acc.set(skill.category, categorySkills);
        return acc;
      }, new Map()),
    );

  const user = (await getServerSession(authOptions))!.user!;

  const defaultValues = await db
    .selectFrom("user_skills")
    .innerJoin("skills", "skills.id", "user_skills.skill_id")
    .select([
      "user_skills.skill_id",
      "user_skills.description",
      "user_skills.price",
      "skills.category",
    ])
    .where("user_id", "=", user.id)
    .where("type", "=", "teach")
    .execute();

  return (
    <TabsContent value="teaching-skills" className="mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Teaching skills</CardTitle>
        </CardHeader>
        <TeachingSkillsClient
          availableSkills={await availableSkills}
          defaultValues={{
            skills: defaultValues.map((skill) => ({
              category: skill.category,
              skill: skill.skill_id.toString(),
              description: skill.description ?? "",
              price: Number(skill.price ?? ""),
            })),
          }}
        />
      </Card>
    </TabsContent>
  );
}
