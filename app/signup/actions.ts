"use server";

import { db } from "@/app/database";
import { hash } from "bcrypt";
import { DatabaseError } from "pg";
import { redirect } from "next/navigation";
import { SignUpActionSchema } from "@/app/signup/schema";

const SALT_ROUNDS = 8;

export async function signUp(formData: FormData) {
  const validatedFormDataResult = await SignUpActionSchema.safeParseAsync(
    Object.fromEntries(formData),
  );
  if (!validatedFormDataResult.success) {
    console.log(validatedFormDataResult.error);
    return undefined;
    //TODO handle error
  }

  const parsedFormData = validatedFormDataResult.data;

  const hashedPassword = await hash(parsedFormData.password, SALT_ROUNDS);
  try {
    await db
      .insertInto("users")
      .values({
        email: parsedFormData.email,
        password: hashedPassword,
        first_name: parsedFormData.firstName,
        last_name: parsedFormData.lastName,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .execute();
  } catch (error) {
    if (
      error instanceof DatabaseError &&
      error.code === "23505" &&
      error.constraint === "users_email_key"
    ) {
      throw new Error("User already exists");
    }
    throw error;
  }

  redirect("/");
}
