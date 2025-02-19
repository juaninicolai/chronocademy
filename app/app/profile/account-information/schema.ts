import { z } from "zod";

// TODO: This is repeated from sign up form
export const timeNow = new Date();

// TODO: This is repeated from sign up form
export const timeBefore100Years = new Date();
timeBefore100Years.setFullYear(timeNow.getFullYear() - 100);

// TODO: This is repeated from sign up form
export const timeBefore18Years = new Date();
timeBefore18Years.setFullYear(timeNow.getFullYear() - 18);

export type AccountInformationForm = z.infer<
  typeof AccountInformationFormSchema
>;
export const AccountInformationFormSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  birthdate: z.date().min(timeBefore100Years).max(timeBefore18Years),
  countryOfBirth: z.number(),
  profileDescription: z.string().min(1),
  languages: z.array(
    z.object({
      language: z.number(),
      languageLevel: z.string().min(1),
    }),
  ),
});

export type AccountInformationFormState = {
  status: "idle" | "ok" | "invalid_form_data";
  message: string;
  errors?: string[];
};
