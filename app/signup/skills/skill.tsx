"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpFormState } from "../form-state";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FAQ } from "./faq";
import { SkillsForm } from "./skills-form";
import { SkillsFormSchema, SkillsFormValues } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import { DBTypes } from "../database";
import { Selectable } from "kysely";

export type Skill = Selectable<
  Pick<DBTypes.Skills, "id" | "category" | "skill">
>;

export default function SkillsPageClient({
  availableSkills,
}: {
  availableSkills: Map<string, Skill[]>;
}) {
  const [formState] = useSignUpFormState();

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: {
      teachingSkills: [
        {
          category: "",
          skill: "",
        },
      ],
      learningSkills: [
        {
          category: "",
          skill: "",
        },
      ],
      profileDescription: "",
    },
  });

  const handleSubmit: SubmitHandler<z.infer<typeof SkillsFormSchema>> = (
    values,
  ) => {};

  return (
    <div className={"px-28 py-6"}>
      <Form {...form}>
        <div className={"space-y-4"}>
          <h3>Please fill in the information about your skills.</h3>
          <h3>
            If you are only interested in either teaching or learning a skill,
            just leave one section blank.
          </h3>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Tabs defaultValue="teach" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="teach">Teach</TabsTrigger>
                <TabsTrigger value="learn">Learn</TabsTrigger>
              </TabsList>
              <TabsContent value="teach">
                <SkillsForm type="teach" availableSkills={availableSkills} />
              </TabsContent>
              <TabsContent value="learn">
                <SkillsForm type="learn" availableSkills={availableSkills} />
              </TabsContent>
            </Tabs>

            <FormField
              control={form.control}
              name="profileDescription"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={"text-base"}>
                    Profile description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself, this information will be public in your profile."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              type="submit"
              disabled={!form.formState.isValid}
            >
              Submit
            </Button>
          </form>
        </div>
      </Form>
      <FAQ />
    </div>
  );
}
