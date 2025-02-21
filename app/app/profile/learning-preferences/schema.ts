import { z } from "zod";

export type LearningPreferencesForm = z.infer<
  typeof LearningPreferencesFormSchema
>;
export const LearningPreferencesFormSchema = z.object({
  skills: z.array(z.string()),
});

export type LearningPreferencesFormState = {
  status: "idle" | "ok" | "invalid_form_data";
  message: string;
  errors?: string[];
};
