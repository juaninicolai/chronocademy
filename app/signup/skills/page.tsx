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

    router.push("/signup/learning");
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
    <Form {...form}>
      <div className={"space-y-4"}>
        <h3>Please fill in the information about your skills.</h3>
        <h3>
          If you are only interested in either teaching or learning a skill,
          just leave on section blank.
        </h3>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
  );
}
