"use client";

import { Form } from "@/components/ui/form";
import {} from "@/components/ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpFormState } from "../form-state";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FAQ } from "./faq";
import { SkillsForm } from "./skills-form";

const SkillsFormSchema = z.object({
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

export default function SkillsPage() {
  const [, setSignUpFormState] = useSignUpFormState();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: {
      skills: [
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
  ) => {
    setSignUpFormState((prevState) => ({
      ...prevState,
      skills: values,
    }));

    //TODO: submit form to create user and also sign it in
    router.push("/app");
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
                <SkillsForm type="teach" />
              </TabsContent>
              <TabsContent value="learn">
                <SkillsForm type="learn" />
              </TabsContent>
            </Tabs>
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
