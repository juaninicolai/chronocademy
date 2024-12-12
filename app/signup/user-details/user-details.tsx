"use client";

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
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useSignUpFormState } from "../form-state";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, CircleMinus, CirclePlus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  timeBefore100Years,
  timeBefore18Years,
  UserDetailsFormSchema,
} from "./schema";
import Image from "next/image";
import { Selectable } from "kysely";
import { DBTypes } from "@/app/database";

export type Country = Selectable<Pick<DBTypes.Countries, "id" | "country">>;
export type Timezone = Selectable<Pick<DBTypes.Timezones, "id" | "timezone">>;
export type Language = Selectable<Pick<DBTypes.Languages, "id" | "language">>;

export default function UserDetailsPageClient({
  availableCountries,
  availableTimezones,
  availableLanguages,
}: {
  availableCountries: Country[];
  availableTimezones: Timezone[];
  availableLanguages: Language[];
}) {
  const [, setSignUpFormState] = useSignUpFormState();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserDetailsFormSchema),
    defaultValues: {
      countryOfBirth: "",
      birthdate: undefined as unknown as Date,
      timezone: "",
      languages: [
        {
          language: "",
          languageLevel: "",
        },
      ],
    },
  });

  const languages = form.watch("languages");

  const languagesFieldArray = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const handleSubmit: SubmitHandler<z.infer<typeof UserDetailsFormSchema>> = (
    values,
  ) => {
    setSignUpFormState((prevState) => ({
      ...prevState,
      userDetails: values,
    }));

    router.push("/signup/skills");
  };

  const handleAddLanguage = () => {
    languagesFieldArray.append({
      language: "",
      languageLevel: "",
    });
  };

  const handleRemoveLanguage = (index: number) => {
    languagesFieldArray.remove(index);
  };

  return (
    <div
      className={
        "flex justify-center items-center h-screen bg-[#ECECEC] space-y-4"
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-1 bg-white rounded-[2rem] px-8 py-5"
        >
          <Image
            src={"/logo.svg"}
            alt={"chronocademy logo"}
            width={140}
            height={76}
            className={"mx-auto my-5"}
          />
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-0">
                <FormLabel className={"text-base"}>Birthdate</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      captionLayout="dropdown"
                      fromYear={timeBefore100Years.getFullYear()}
                      toYear={timeBefore18Years.getFullYear()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryOfBirth"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={"text-base"}>Country</FormLabel>
                <Select
                  defaultValue={field.value}
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Country of birth" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableCountries.map((country) => (
                      <SelectItem
                        key={country.id}
                        value={country.id.toString()}
                      >
                        {country.country}
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
            name="timezone"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={"text-base"}>Timezone</FormLabel>
                <Select
                  defaultValue={field.value}
                  disabled={field.disabled}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Timezone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTimezones.map((timezone) => (
                      <SelectItem
                        key={timezone.id}
                        value={timezone.id.toString()}
                      >
                        {timezone.timezone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={"space-y-2"}>
            {languagesFieldArray.fields.map((item, index) => (
              <fieldset key={item.id} className="flex items-end gap-4">
                <FormField
                  control={form.control}
                  name={`languages.${index}.language`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={"text-base"}>Language</FormLabel>
                      <Select
                        defaultValue={field.value}
                        disabled={field.disabled}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableLanguages.map((language) => (
                            <SelectItem
                              key={language.id}
                              value={language.id.toString()}
                            >
                              {language.language}
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
                  name={`languages.${index}.languageLevel`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel className={"text-base"}>Level</FormLabel>
                      <Select
                        defaultValue={field.value}
                        disabled={field.disabled}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="native">Native</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={languagesFieldArray.fields.length <= 1}
                  size={"icon"}
                  type={"button"}
                  variant={"destructive"}
                  onClick={() => handleRemoveLanguage(index)}
                >
                  <CircleMinus />
                </Button>
              </fieldset>
            ))}

            <Button
              className="space-y-0"
              size={"sm"}
              type={"button"}
              onClick={handleAddLanguage}
              disabled={languages.some(
                (field) => field.language === "" || field.languageLevel === "",
              )}
            >
              <CirclePlus />
              Add language
            </Button>
          </div>

          <Button
            className="w-full min-h-[62px] border-2 font-roboto text-xl p-4 rounded-lg"
            variant="default"
            disabled={!form.formState.isValid}
            type="submit"
          >
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
