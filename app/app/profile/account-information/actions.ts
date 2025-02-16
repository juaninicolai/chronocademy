"use server";

import { db } from "@/app/database";
import {
  AccountInformationForm,
  AccountInformationFormSchema,
  AccountInformationFormState,
} from "./schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateAccountInformation(
  _: AccountInformationFormState,
  values: AccountInformationForm,
): Promise<AccountInformationFormState> {
  const validatedFormDataResult =
    await AccountInformationFormSchema.safeParseAsync(values);

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
  console.log(user);

  await db
    .updateTable("user_data")
    .set({
      birthdate: parsedFormData.birthdate,
      first_name: parsedFormData.firstName,
      last_name: parsedFormData.lastName,
      origin_country: parsedFormData.countryOfBirth,
      description: parsedFormData.profileDescription,
    })
    .where("user_id", "=", user.id)
    .execute();

  return { status: "ok", message: "Account information updated successfully" };
}
