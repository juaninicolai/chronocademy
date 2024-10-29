"use client";

import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "@/app/signup/actions";
import { SignUpActionSchema, SignUpFormState } from "@/app/signup/schema";
import { useRef } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUpFormSchema = SignUpActionSchema.extend({
  confirmPassword: z.custom(),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    path: ["confirmPassword"],
    message: "Passwords must match!",
  },
);

export default function SignUpPage() {
  const ref = useRef<HTMLFormElement>(null);

  const initialState: SignUpFormState = {
    message: "",
  };

  const [state, formAction] = useFormState(signUp, initialState);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div
      className={
        "flex flex-col justify-center items-center h-screen bg-[#ECECEC] space-y-4"
      }
    >
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(() =>
            formAction(new FormData(ref.current!)),
          )}
          action={formAction}
          className="space-y-1 w-[368px] bg-white rounded-[2rem] px-8 py-5"
        >
          <Image
            src={"/logo.svg"}
            alt={"chronocademy logo"}
            width={140}
            height={76}
            className={"mx-auto my-5"}
          />
          {state.message !== "" && (
            <Alert
              variant={"destructive"}
              className={"bg-[#c94b4b] text-white"}
            >
              <AlertDescription className={"font-medium"}>
                {state.message}
              </AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={"text-base"}>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={"text-base"}>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={"text-base"}>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={"text-base"}>First name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className={"text-base"}>Last name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full min-h-[62px] border-2 border-primary-blue-500 bg-primary-blue-500 text-secondary-white-500 font-roboto text-xl p-4 rounded-lg hover:bg-primary-blue-100 hover:text-primary-blue-500"
            variant="outline"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </Form>
      <div>
        <h4>
          Already have an account?{" "}
          <Link
            href={"/api/auth/signin?callbackUrl=/app"}
            className={"underline"}
          >
            Sign in
          </Link>
        </h4>
      </div>
      <p>
        By signing up, you agree to the Terms of Service and Privacy Policy,
        including Cookie Use.
      </p>
    </div>
  );
}
