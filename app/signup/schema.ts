import { z } from "zod";

export const SignUpActionSchema = z.object({
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
  message: string;
  errors?: string[];
};
