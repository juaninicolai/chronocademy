"use client";

// Form
// Selector wtih skills from database
// Textarea profile description

import { format } from "date-fns";
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
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { useSignUpFormState } from "../form-state";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const SkillsFormSchema = z.object({
  category: z.string().min(1),
  skill: z.string().min(1),
  profileDescription: z.string().min(1),
});

export default function SkillsPage() {
  const [, setSignUpFormState] = useSignUpFormState();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SkillsFormSchema),
    defaultValues: {
      category: "",
      skill: "",
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

    router.push("/signup/learning");
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* TODO: Allow people to add more skills  */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className={"text-base"}>Category</FormLabel>
              <Select
                defaultValue={field.value}
                disabled={field.disabled}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO: Use categories from database */}
                  <SelectItem value="languages">Languages</SelectItem>
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
          name="skill"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className={"text-base"}>Skill</FormLabel>
              <Select
                defaultValue={field.value}
                disabled={field.disabled}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Skill" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="economics">Economics</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileDescription"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className={"text-base"}>Profile description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit">
          {form.formState.isValid ? "Next" : "Skip"}
        </Button>
      </form>
    </Form>
  );
}
