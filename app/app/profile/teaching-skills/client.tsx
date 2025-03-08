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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const FormID = "teaching-skills-form";

const TeachingSkillsClientFormSchema = TeachingSkillsFormSchema.merge(
  z.object({
    skills: z.array(
      z.object({
        category: z.string().min(1),
        skill: z.string().min(1),
        description: z.string().min(1),
        price: z.number().positive(),
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
      skills: values.skills.map((skill) => ({
        id: Number(skill.skill),
        description: skill.description,
        price: skill.price,
      })),
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
      description: "",
      price: 0,
    });
  };

  const handleRemoveSkill = (index: number) => {
    skillsFieldArray.remove(index);
  };

  // TODO: This is repeated from sign up form
  return (
    <>
      <CardContent className="flex justify-center">
        <Form {...form}>
          <form
            id={FormID}
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {skillsFieldArray.fields.map((item, index) => (
              <fieldset className={"flex flex-col gap-2"} key={item.id}>
                <div className="flex items-end gap-4">
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
                </div>

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="space-y-0 flex-grow-[1]">
                        <FormLabel className={"text-base"}>
                          Lesson description
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`skills.${index}.price`}
                    render={({ field }) => (
                      <FormItem className="space-y-0 max-w-32">
                        <FormLabel className={"text-base"}>
                          Lesson price
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2 items-center">
                            <Input type="number" {...field} />
                            <p className="text-base font-black">€/h</p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {index < skillsFieldArray.fields.length - 1 && (
                  <Separator className="mt-4" />
                )}
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
