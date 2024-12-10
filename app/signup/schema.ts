import { z } from "zod";
import { UserDetailsFormSchema } from "./user-details/schema";

export const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Password should include an uppercase letter")
    .regex(/[0-9]/, "Password should include a number"),
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
});

export type SignUpFormState = {
  status: "idle" | "ok" | "invalid_form_data" | "user_already_exists";
  message: string;
  errors?: string[];
};

export type SignUpFullForm = z.infer<typeof SignUpFullFormSchema>;
export const SignUpFullFormSchema = SignUpFormSchema.merge(
  UserDetailsFormSchema,
)
  .merge(
    z.object({
      profileDescription: z.string().min(1),
      teachingSkills: z.array(z.number()),
      learningSkills: z.array(z.number()),
    }),
  )
  .merge(
    z.object({
      countryOfBirth: z.number(),
      timezone: z.number(),
    }),
  );

export type CheckIfEmailIsTaken = {
  status: boolean;
  message: string;
  errors?: string[];
};
