"use server";

import { db } from "@/app/database";
import { hash } from "bcrypt";
import { DatabaseError } from "pg";
import {
  SignUpFormState,
  SignUpFullForm,
  SignUpFullFormSchema,
} from "./schema";

const SALT_ROUNDS = 8;

export async function signUp(
  _: SignUpFormState,
  values: SignUpFullForm,
): Promise<SignUpFormState> {
  const validatedFormDataResult =
    await SignUpFullFormSchema.safeParseAsync(values);

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

  const signUpFormData = {
    email: parsedFormData.email,
    hashedPassword: await hash(parsedFormData.password, SALT_ROUNDS),
    firstName: parsedFormData.firstName,
    lastName: parsedFormData.lastName,
  };

  const userDetailsFormData = {
    countryOfBirth: parsedFormData.countryOfBirth,
    birthdate: parsedFormData.birthdate,
    timezone: parsedFormData.timezone,
    languages: parsedFormData.languages,
  };

  const skillsFormData = {
    profileDescription: parsedFormData.profileDescription,
    teachingSkills: parsedFormData.teachingSkills,
    learningSkills: parsedFormData.learningSkills,
  };

  try {
    await db.transaction().execute(async (trx) => {
      const insertUserResult = await trx
        .insertInto("users")
        .values({
          email: signUpFormData.email,
          password: signUpFormData.hashedPassword,
        })
        .returning("id")
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("user_data")
        .values({
          user_id: insertUserResult.id,
          origin_country: userDetailsFormData.countryOfBirth,
          birthdate: userDetailsFormData.birthdate,
          first_name: signUpFormData.firstName,
          last_name: signUpFormData.lastName,
          timezone: userDetailsFormData.timezone,
          description: skillsFormData.profileDescription,
        })
        .execute();

      await trx
        .insertInto("user_languages")
        .values(
          userDetailsFormData.languages.map(({ language, languageLevel }) => ({
            user_id: insertUserResult.id,
            language: language,
            level: languageLevel,
          })),
        )
        .execute();

      await trx
        .insertInto("user_skills")
        .values(
          skillsFormData.teachingSkills
            .map((skillId) => ({
              user_id: insertUserResult.id,
              type: "teach",
              skill_id: skillId,
            }))
            .concat(
              skillsFormData.learningSkills.map((skillId) => ({
                user_id: insertUserResult.id,
                type: "learn",
                skill_id: skillId,
              })),
            ),
        )
        .execute();
    });
  } catch (error) {
    if (
      error instanceof DatabaseError &&
      error.code === "23505" &&
      error.constraint === "users_email_key"
    ) {
      return {
        status: "user_already_exists",
        message: "User already exists",
      };
    }
    throw error;
  }

  return { status: "ok", message: "User signed up successfully" };
}
