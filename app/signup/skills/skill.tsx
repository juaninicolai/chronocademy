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
import { SkillsForm } from "@/app/signup/skills/skills-form";
import { SkillsFormSchema, SkillsFormValues } from "./schema";
import { Textarea } from "@/components/ui/textarea";
import { DBTypes } from "../../database";
import { Selectable } from "kysely";
import { signUp } from "../actions";
import { SignUpFullForm } from "../schema";
import { signIn } from "next-auth/react";
import { useFormState } from "react-dom";
import { SignUpFormState } from "../schema";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export type Skill = Selectable<
  Pick<DBTypes.Skills, "id" | "category" | "skill">
>;

export default function SkillsPageClient({
  availableSkills,
}: {
  availableSkills: Map<string, Skill[]>;
}) {
  const [signUpFormState] = useSignUpFormState();
  const { toast } = useToast();

  const [actionState, signUpAction] = useFormState<
    SignUpFormState,
    SignUpFullForm
  >(signUp, {
    status: "idle",
    message: "",
  });

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

  useEffect(() => {
    if (actionState.status === "idle") return;

    if (actionState.status !== "ok") {
      toast({
        variant: "destructive",
        title: actionState.message,
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      return;
    }

    signIn("credentials", {
      email: signUpFormState.signUp.email,
      password: signUpFormState.signUp.password,
    });
  }, [toast, actionState, signUpFormState]);

  const handleSubmit: SubmitHandler<z.infer<typeof SkillsFormSchema>> = async (
    skillsFormState,
  ) => {
    signUpAction({
      email: signUpFormState.signUp.email,
      firstName: signUpFormState.signUp.firstName,
      lastName: signUpFormState.signUp.lastName,
      password: signUpFormState.signUp.password,
      birthdate: signUpFormState.userDetails.birthdate,
      countryOfBirth: signUpFormState.userDetails.countryOfBirth,
      languages: signUpFormState.userDetails.languages,
      timezone: signUpFormState.userDetails.timezone,
      profileDescription: skillsFormState.profileDescription,
      teachingSkills: skillsFormState.teachingSkills
        .filter(({ skill }) => skill !== "")
        .map(({ skill }) => Number(skill)),
      learningSkills: skillsFormState.learningSkills
        .filter(({ skill }) => skill !== "")
        .map(({ skill }) => Number(skill)),
    });
  };

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
