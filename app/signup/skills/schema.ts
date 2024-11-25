import { z } from "zod";

export const SkillsFormSchema = z.object({
  skills: z
    .array(
      z.object({
        category: z.string().min(1),
        skill: z.string().min(1),
      }),
    )
    .min(1),
  profileDescription: z.string().min(1),
});
