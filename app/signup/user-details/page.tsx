"use client";

import React from "react";
import { useSignUpFormState } from "../form-state";
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
import { useForm } from "react-hook-form";

export default function UserDetailsPage() {
  const [signUpFormState] = useSignUpFormState();
  console.log(signUpFormState);

  const form = useForm({
    defaultValues: {
      countryOfBirth: "",
    },
  });

  return (
    <Form {...form}>
      <form>
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
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO: Use countries from database */}
                  <SelectItem value="denmark">Denmark</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="bulgaria">Bulgaria</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
