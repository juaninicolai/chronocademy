import { z } from "zod";

export type SkillsFormValues = z.infer<typeof SkillsFormSchema>;

export const SkillsFormSchema = z.object({
  teachingSkills: z.array(
    z.object({
      category: z.string(),
      skill: z.string(),
    }),
  ),
  learningSkills: z.array(
    z.object({
      category: z.string(),
      skill: z.string(),
    }),
  ),
  profileDescription: z.string().min(1),
});
