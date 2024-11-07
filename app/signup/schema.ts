import { z } from "zod";

export const SignUpActionSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "password should include an uppercase letter")
    .regex(/[0-9]/, "password should include a number"),
  firstName: z.string(),
  lastName: z.string(),
});

export type SignUpFormState = {
  message: string;
  errors?: string[];
};
