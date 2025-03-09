"use server";

import { db } from "@/app/database";
import {
  TeachingSkillsForm,
  TeachingSkillsFormSchema,
  TeachingSkillsFormState,
} from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export async function updateTeachingSkills(
  _: TeachingSkillsFormState,
  values: TeachingSkillsForm,
): Promise<TeachingSkillsFormState> {
  const validatedFormDataResult =
    await TeachingSkillsFormSchema.safeParseAsync(values);

  if (!validatedFormDataResult.success) {
    return {
      status: "invalid_form_data",
      message: "Invalid form data",
      errors: validatedFormDataResult.error.issues.map(
        (issue) => issue.message,
      ),
    };
  }

  const parsedFormData = validatedFormDataResult.data;

  const user = (await getServerSession(authOptions))!.user!;

  await db.transaction().execute(async (trx) => {
    // TODO: Avoid truncating user teaching skills when updating and instead send operation instructions
    await trx
      .deleteFrom("user_skills")
      .where("user_id", "=", user.id)
      .where("type", "=", "teach")
      .execute();

    await trx
      .insertInto("user_skills")
      .values(
        parsedFormData.skills.map((skill) => ({
          user_id: user.id,
          type: "teach",
          skill_id: skill.id,
          description: skill.description,
          price: skill.price,
        })),
      )
      .execute();
  });

  return { status: "ok", message: "Teaching skills updated successfully" };
}
