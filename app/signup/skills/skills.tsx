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
import Image from "next/image";

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
      countryOfBirth: Number(signUpFormState.userDetails.countryOfBirth),
      languages: signUpFormState.userDetails.languages.map(languageObject => ({
        language: Number(languageObject.language),
        languageLevel: languageObject.languageLevel
      })),
      timezone: Number(signUpFormState.userDetails.timezone),
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
    <div className="bg-[#ECECEC] px-28 py-6 flex flex-col space-y-6">
      <div>
        <h2 className="font-inter text-secondary-black-500 font-extrabold">
          Please fill in the information about your skills
        </h2>
        <h3 className="font-roboto text-h3 py-4">
          Leave one section blank if you only want to teach or learn a skill
        </h3>
        <div className="flex justify-center bg-[#ECECEC]">
          <Form {...form}>
            <form
              className="space-y-4 border-2 py-4 px-16 rounded-[2rem] bg-white"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <Image
                src={"/logo.svg"}
                alt={"chronocademy logo"}
                width={140}
                height={76}
                className={"mx-auto my-5"}
              />
              <div>
                <Tabs defaultValue="teach">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="teach">Teach</TabsTrigger>
                    <TabsTrigger value="learn">Learn</TabsTrigger>
                  </TabsList>
                  <TabsContent value="teach">
                    <SkillsForm
                      type="teach"
                      availableSkills={availableSkills}
                    />
                  </TabsContent>
                  <TabsContent value="learn">
                    <SkillsForm
                      type="learn"
                      availableSkills={availableSkills}
                    />
                  </TabsContent>
                </Tabs>
              </div>
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
                        placeholder="Hello! My name is John and I am a software engineer. I have been working in the industry for 5 years and I am passionate about teaching others how to code."
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
          </Form>
        </div>
      </div>
      <FAQ />
    </div>
  );
}
