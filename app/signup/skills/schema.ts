import { z } from "zod";

export type SkillsFormValues = z.infer<typeof SkillsFormSchema>;

const skillsSchema = z
  .array(
    z.object({
      category: z.string().min(1),
      skill: z.string().min(1),
    }),
  )
  .min(1);

export const SkillsFormSchema = z
  .object({
    profileDescription: z.string().min(1),
  })
  .and(
    z.union([
      z.object({
        teachingSkills: skillsSchema,
        learningSkills: skillsSchema.length(0),
      }),

      z.object({
        teachingSkills: skillsSchema.length(0),
        learningSkills: skillsSchema,
      }),

      z.object({
        teachingSkills: skillsSchema,
        learningSkills: skillsSchema,
      }),
    ]),
  );
