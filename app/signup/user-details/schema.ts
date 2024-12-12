import { z } from "zod";

export const timeNow = new Date();

export const timeBefore100Years = new Date();
timeBefore100Years.setFullYear(timeNow.getFullYear() - 100);

export const timeBefore18Years = new Date();
timeBefore18Years.setFullYear(timeNow.getFullYear() - 18);

export const UserDetailsFormSchema = z.object({
  countryOfBirth: z.string().min(1),
  birthdate: z.date().min(timeBefore100Years).max(timeBefore18Years),
  timezone: z.string().min(1),
  languages: z
    .array(
      z.object({
        language: z.string().min(1),
        languageLevel: z.string().min(1),
      }),
    )
    .min(1),
});
