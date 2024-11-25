"use server";

import { db } from "@/app/database";
import { hash } from "bcrypt";
import { DatabaseError } from "pg";
import { redirect } from "next/navigation";
import { SignUpActionSchema, SignUpFormState } from "@/app/signup/schema";
import { UserDetailsFormSchema } from "./user-details/schema";
import { SkillsFormSchema } from "./skills/schema";

const SALT_ROUNDS = 8;

export async function signUp(
  _: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const validatedFormDataResult = await SignUpActionSchema.merge(
    UserDetailsFormSchema,
  )
    .merge(SkillsFormSchema)
    .safeParseAsync(Object.fromEntries(formData));

  if (!validatedFormDataResult.success) {
    console.log(validatedFormDataResult.error);
    return {
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

  try {
    db.transaction().execute(async (trx) => {
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
    });
  } catch (error) {
    if (
      error instanceof DatabaseError &&
      error.code === "23505" &&
      error.constraint === "users_email_key"
    ) {
      return {
        message: "User already exists",
      };
    }
    throw error;
  }

  redirect("/");
}
