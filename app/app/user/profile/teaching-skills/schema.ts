import { z } from "zod";

export type TeachingSkillsForm = z.infer<typeof TeachingSkillsFormSchema>;
export const TeachingSkillsFormSchema = z.object({
  skills: z.array(
    z.object({
      id: z.number(),
      description: z.string(),
      price: z.number().nonnegative(),
    }),
  ),
});

export type TeachingSkillsFormState = {
  status: "idle" | "ok" | "invalid_form_data";
  message: string;
  errors?: string[];
};
