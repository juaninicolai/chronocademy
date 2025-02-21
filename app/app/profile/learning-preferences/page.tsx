import { db } from "@/app/database";
import { LearningPreferencesClient } from "./client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export default async function LearningPreferencesPage() {
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
    .select(["user_skills.skill_id", "skills.category"])
    .where("user_id", "=", user.id)
    .where("type", "=", "learn")
    .execute();

  return (
    <TabsContent value="learning-preferences">
      <Card>
        <CardHeader>
          <CardTitle>Learning preferences</CardTitle>
        </CardHeader>
        <LearningPreferencesClient
          availableSkills={await availableSkills}
          defaultValues={{
            skills: defaultValues.map((skill) => ({
              category: skill.category,
              skill: skill.skill_id.toString(),
            })),
          }}
        />
      </Card>
    </TabsContent>
  );
}
