"use client";

import { DBTypes } from "@/app/database";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Selectable } from "kysely";
import { CalendarIcon, CircleMinus, CirclePlus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  AccountInformationFormSchema,
  timeBefore100Years,
  timeBefore18Years,
} from "./schema";
import { useFormState } from "react-dom";
import { updateAccountInformation } from "./actions";

const FormID = "account-information-form";

const AccountInformationClientFormSchema = AccountInformationFormSchema.merge(
  z.object({
    countryOfBirth: z.string(),
    languages: z.array(
      AccountInformationFormSchema.shape.languages.element.merge(
        z.object({
          language: z.string().min(1),
        }),
      ),
    ),
  }),
);

// TODO: This is repeated from sign up form
export type Country = Selectable<Pick<DBTypes.Countries, "id" | "country">>;
export type Timezone = Selectable<Pick<DBTypes.Timezones, "id" | "timezone">>;
export type Language = Selectable<Pick<DBTypes.Languages, "id" | "language">>;

export function AccountInformationClient({
  availableCountries,
  availableLanguages,
  defaultValues,
}: {
  availableCountries: Country[];
  availableTimezones: Timezone[];
  availableLanguages: Language[];
  defaultValues: z.infer<typeof AccountInformationClientFormSchema>;
}) {
  const [, updateAccountInformationAction] = useFormState(
    updateAccountInformation,
    {
      status: "idle",
      message: "",
    },
  );

  const form = useForm({
    resolver: zodResolver(AccountInformationClientFormSchema),
    defaultValues,
  });

  const handleSubmit = (
    values: z.infer<typeof AccountInformationClientFormSchema>,
  ) => {
    updateAccountInformationAction({
      firstName: values.firstName,
      lastName: values.lastName,
      birthdate: values.birthdate,
      countryOfBirth: Number(values.countryOfBirth),
      profileDescription: values.profileDescription,
      languages: values.languages.map((language) => ({
        language: Number(language.language),
        languageLevel: language.languageLevel,
      })),
    });

    form.reset(values);
  };

  const languages = form.watch("languages");

  const languagesFieldArray = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const handleAddLanguage = () => {
    languagesFieldArray.append({
      language: "",
      languageLevel: "",
    });
  };

  const handleRemoveLanguage = (index: number) => {
    languagesFieldArray.remove(index);
  };

  // TODO: This is repeated from sign up form
  return (
    <>
      <CardContent>
        <Form {...form}>
          <form id={FormID} onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                    value={field.value}
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
              name="profileDescription"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className={"text-base"}>
                    Profile description
                  </FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              {languagesFieldArray.fields.map((item, index) => (
                <fieldset key={item.id} className="flex items-end gap-4">
                  <FormField
                    control={form.control}
                    name={`languages.${index}.language`}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormLabel className={"text-base"}>Language</FormLabel>
                        <Select
                          value={field.value}
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
                          value={field.value}
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
                  (field) =>
                    field.language === "" || field.languageLevel === "",
                )}
              >
                <CirclePlus />
                Add language
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter>
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
