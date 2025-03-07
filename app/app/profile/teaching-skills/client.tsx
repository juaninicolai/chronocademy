"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { TeachingSkillsFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Selectable } from "kysely";
import { DBTypes } from "@/app/database";
import { updateTeachingSkills } from "./actions";
import { useFormState } from "react-dom";

const FormID = "teaching-skills-form";

const TeachingSkillsClientFormSchema = TeachingSkillsFormSchema.merge(
  z.object({
    skills: z.array(
      z.object({
        category: z.string().min(1),
        skill: z.string().min(1),
      }),
    ),
  }),
);

export type Skill = Selectable<
  Pick<DBTypes.Skills, "id" | "category" | "skill">
>;

export function TeachingSkillsClient({
  availableSkills,
  defaultValues,
}: {
  availableSkills: Map<string, Skill[]>;
  defaultValues: z.infer<typeof TeachingSkillsClientFormSchema>;
}) {
  const [, updateTeachingSkillsAction] = useFormState(updateTeachingSkills, {
    status: "idle",
    message: "",
  });

  const form = useForm({
    resolver: zodResolver(TeachingSkillsClientFormSchema),
    defaultValues,
  });

  const handleSubmit = (
    values: z.infer<typeof TeachingSkillsClientFormSchema>,
  ) => {
    updateTeachingSkillsAction({
      skills: values.skills.map((skill) => skill.skill),
    });

    form.reset(values);
  };

  const skillsFieldArray = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const watchSkillsFieldArray = form.watch("skills");

  const handleAddSkill = () => {
    skillsFieldArray.append({
      category: "",
      skill: "",
    });
  };

  const handleRemoveSkill = (index: number) => {
    skillsFieldArray.remove(index);
  };

  // TODO: This is repeated from sign up form
  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            id={FormID}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            {skillsFieldArray.fields.map((item, index) => (
              <fieldset className={"flex items-end gap-4"} key={item.id}>
                <FormField
                  control={form.control}
                  name={`skills.${index}.category`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={"text-base"}>Category</FormLabel>
                      <Select
                        value={field.value}
                        disabled={field.disabled}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(availableSkills.keys()).map((key) => (
                            <SelectItem key={key} value={key}>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`skills.${index}.skill`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={"text-base"}>Skill</FormLabel>
                      <Select
                        value={field.value}
                        disabled={field.disabled}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Skill" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableSkills
                            .get(watchSkillsFieldArray[index].category)
                            ?.map((skill) => (
                              <SelectItem
                                key={skill.id}
                                value={skill.id.toString()}
                              >
                                {skill.skill}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={skillsFieldArray.fields.length <= 1}
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => handleRemoveSkill(index)}
                >
                  <CircleMinus />
                </Button>
              </fieldset>
            ))}

            <Button
              size={"sm"}
              type={"button"}
              onClick={handleAddSkill}
              disabled={watchSkillsFieldArray.some(
                (field) => field.category === "" || field.skill === "",
              )}
            >
              <CirclePlus />
              Add skill
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex-row-reverse">
        <Button
          type="submit"
          form={FormID}
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
        >
          Update
        </Button>
      </CardFooter>
    </>
  );
}
