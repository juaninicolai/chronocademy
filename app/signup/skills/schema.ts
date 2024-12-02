import { z } from "zod";

export type SkillsFormValues = z.infer<typeof SkillsFormSchema>;

const skillsFilledSchema = z
  .array(
    z.object({
      category: z.string().min(1),
      skill: z.string().min(1),
    }),
  )
  .min(1);
const skillsEmptySchema = z
  .array(
    z.object({
      category: z.literal(""),
      skill: z.literal(""),
    }),
  )
  .max(1);

export const SkillsFormSchema = z
  .object({
    profileDescription: z.string().min(1),
  })
  .and(
    z.union([
      z.object({
        teachingSkills: skillsFilledSchema,
        learningSkills: skillsEmptySchema,
      }),

      z.object({
        teachingSkills: skillsEmptySchema,
        learningSkills: skillsFilledSchema,
      }),

      z.object({
        teachingSkills: skillsFilledSchema,
        learningSkills: skillsFilledSchema,
      }),
    ]),
  );
