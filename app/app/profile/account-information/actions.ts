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

  // TODO: We have to validate the file type and size
  let pictureBuffer: Buffer | null = null;
  if (parsedFormData.picture !== null) {
    const pictureFile = parsedFormData.picture.get("file") as File;
    const pictureArrayBuffer = await pictureFile.arrayBuffer();
    pictureBuffer = Buffer.from(pictureArrayBuffer);
  }

  const user = (await getServerSession(authOptions))!.user!;

  await db.transaction().execute(async (trx) => {
    if (pictureBuffer !== null) {
      await trx
        .insertInto("user_pictures")
        .values({ user_id: user.id, blob: pictureBuffer })
        .onConflict((oc) =>
          oc.column("user_id").doUpdateSet((eb) => ({
            blob: eb.ref("excluded.blob"),
          })),
        )
        .execute();
    }

    await trx
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

    // TODO: Avoid truncating user languages when updating and instead send operation instructions
    await trx
      .deleteFrom("user_languages")
      .where("user_id", "=", user.id)
      .execute();

    await trx
      .insertInto("user_languages")
      .values(
        parsedFormData.languages.map((language) => ({
          user_id: user.id,
          language_id: language.language,
          level: language.languageLevel,
        })),
      )
      .execute();
  });

  return { status: "ok", message: "Account information updated successfully" };
}
