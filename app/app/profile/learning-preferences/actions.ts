"use server";

import { db } from "@/app/database";
import {
  LearningPreferencesForm,
  LearningPreferencesFormSchema,
  LearningPreferencesFormState,
} from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateLearningPreferences(
  _: LearningPreferencesFormState,
  values: LearningPreferencesForm,
): Promise<LearningPreferencesFormState> {
  const validatedFormDataResult =
    await LearningPreferencesFormSchema.safeParseAsync(values);

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
    // TODO: Avoid truncating user learning preferences when updating and instead send operation instructions
    await trx
      .deleteFrom("user_skills")
      .where("user_id", "=", user.id)
      .where("type", "=", "learn")
      .execute();

    await trx
      .insertInto("user_skills")
      .values(
        parsedFormData.skills.map((skill) => ({
          user_id: user.id,
          type: "learn",
          skill_id: Number(skill),
        })),
      )
      .execute();
  });

  return { status: "ok", message: "Learning preferences updated successfully" };
}
