import { z } from "zod";

export type TeachingSkillsForm = z.infer<typeof TeachingSkillsFormSchema>;
export const TeachingSkillsFormSchema = z.object({
  skills: z.array(z.string()),
});

export type TeachingSkillsFormState = {
  status: "idle" | "ok" | "invalid_form_data";
  message: string;
  errors?: string[];
};
