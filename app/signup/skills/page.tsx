"use client";

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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useSignUpFormState } from "../form-state";
import { Button } from "@/components/ui/button";
import { CircleMinus, CirclePlus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const skillsFieldArray = useFieldArray({
    control: form.control,
    name: "skills",
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

  const handleAddSkill = () => {
    skillsFieldArray.append({
      category: "",
      skill: "",
    });
  };

  const handleRemoveSkill = (index: number) => {
    skillsFieldArray.remove(index);
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
                {/* TODO: Allow people to add more skills  */}
                <h5>What skills would you like to teach?</h5>
                <div className={"space-y-2"}>
                  {skillsFieldArray.fields.map((item, index) => (
                    <fieldset className={"flex items-end gap-4"} key={item.id}>
                      <FormField
                        control={form.control}
                        name={`skills.${index}.category`}
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel className={"text-base"}>
                              Category
                            </FormLabel>
                            <Select
                              defaultValue={field.value}
                              disabled={field.disabled}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[280px]">
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {/* TODO: Use categories from database */}
                                <SelectItem value="languages">
                                  Languages
                                </SelectItem>
                                <SelectItem value="artsAndHumanities">
                                  Arts & Humanities
                                </SelectItem>
                                <SelectItem value="businessAndMarketing">
                                  Business & Marketing
                                </SelectItem>
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
                              defaultValue={field.value}
                              disabled={field.disabled}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[280px]">
                                  <SelectValue placeholder="Skill" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="history">History</SelectItem>
                                <SelectItem value="economics">
                                  Economics
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {skillsFieldArray.fields.length > 1 && (
                        <Button
                          size={"icon"}
                          variant={"destructive"}
                          onClick={() => handleRemoveSkill(index)}
                        >
                          <CircleMinus />
                        </Button>
                      )}
                    </fieldset>
                  ))}
                  <Button size={"sm"} type={"button"} onClick={handleAddSkill}>
                    <CirclePlus />
                    Add skill
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="learn">
                {/* TODO: Allow people to add more skills  */}
                <h5>What skills would you like to develop?</h5>
                <div className={"space-y-2"}>
                  {skillsFieldArray.fields.map((item, index) => (
                    <fieldset className={"flex items-end gap-4"} key={item.id}>
                      <FormField
                        control={form.control}
                        name={`skills.${index}.category`}
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormLabel className={"text-base"}>
                              Category
                            </FormLabel>
                            <Select
                              defaultValue={field.value}
                              disabled={field.disabled}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[280px]">
                                  <SelectValue placeholder="Category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {/* TODO: Use categories from database */}
                                <SelectItem value="languages">
                                  Languages
                                </SelectItem>
                                <SelectItem value="artsAndHumanities">
                                  Arts & Humanities
                                </SelectItem>
                                <SelectItem value="businessAndMarketing">
                                  Business & Marketing
                                </SelectItem>
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
                              defaultValue={field.value}
                              disabled={field.disabled}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="w-[280px]">
                                  <SelectValue placeholder="Skill" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="history">History</SelectItem>
                                <SelectItem value="economics">
                                  Economics
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {skillsFieldArray.fields.length > 1 && (
                        <Button
                          size={"icon"}
                          variant={"destructive"}
                          onClick={() => handleRemoveSkill(index)}
                        >
                          <CircleMinus />
                        </Button>
                      )}
                    </fieldset>
                  ))}
                  <Button size={"sm"} type={"button"} onClick={handleAddSkill}>
                    <CirclePlus />
                    Add skill
                  </Button>
                </div>
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
      <div>
        <h1 className="font-inter text-secondary-black-500 font-extrabold">
          Frequently Asked Questions
        </h1>
        <h2 className="font-roboto text-h2 py-4">
          Get the answers to your questions straight away
        </h2>
      </div>
      <div>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              Can I update my skills later?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely! You can edit or add skills anytime after sign-up to
              keep your profile up-to-date as you gain more experience or new
              interests.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              How detailed should my skill descriptions be?
            </AccordionTrigger>
            <AccordionContent>
              Aim to provide a concise but informative description. For example,
              instead of just &#34;Math,&#34; specify &#34;Algebra and Calculus
              for for high school students&#34; or instead of just “Spanish”
              specify &#34;Beginner&#39;s conversational Spanish.&#34;
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              Can I list multiple skills I want to learn or teach?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you can add as many skills as you’d like to both lists. This
              helps match you with a wider range of potential learners or
              teachers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold">
              What if I’m unsure about my teaching qualifications?
            </AccordionTrigger>
            <AccordionContent>
              If you're not formally certified but have experience (e.g.,
              tutoring or personal study), mention that in your description. If
              you have formal education or certification, listing it under
              Education adds credibility.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-bold">
              How do I get Chronos to learn if I don’t have anything to teach?
            </AccordionTrigger>
            <AccordionContent>
              At first you can use the welcome Chronos given to you, but then,
              for the beta version, you will have to give some classes to earn
              Chronos. It doesn’t need to be something academic or of high
              degree, it can be anything you are good at. After the beta
              version, payment methods will be introduced to purchase Chronos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="font-bold">
              I can’t find the teaching or learning category I want to add.
            </AccordionTrigger>
            <AccordionContent>
              Send us an email to info@chronocademy.com with the subject
              “category” and, in the message, specify which category you would
              like us to add. We’ll then send you a confirmation email when it’s
              been updated and you can add it from your profile.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
