"use client";

import { SubmitHandler, useForm } from "react-hook-form";
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
import { SignUpFormSchema } from "@/app/signup/schema";
import { useRouter } from "next/navigation";
import { useSignUpFormState } from "./form-state";
import { checkIfEmailIsTaken } from "./actions";

const SignUpClientFormSchema = SignUpFormSchema.extend({
  confirmPassword: z.string(),
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
  const router = useRouter();
  const [, setSignUpFormState] = useSignUpFormState();

  const form = useForm<z.infer<typeof SignUpClientFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpClientFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const handleSubmit: SubmitHandler<
    z.infer<typeof SignUpClientFormSchema>
  > = async (values) => {
    const isEmailTaken = await checkIfEmailIsTaken(values.email);
    if (isEmailTaken.status) {
      form.setError("email", {
        type: "custom",
        message: isEmailTaken.message,
      });
      return;
    }

    setSignUpFormState((prevState) => ({
      ...prevState,
      signUp: values,
    }));

    router.push("/signup/user-details");
  };

  return (
    <div
      className={
        "flex flex-col justify-center items-center h-screen bg-[#ECECEC] space-y-4"
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-1 w-[368px] bg-white rounded-[2rem] px-8 py-5"
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
            className="w-full min-h-[62px] border-2 font-roboto text-xl p-4 rounded-lg"
            variant="default"
            disabled={!form.formState.isValid}
            type="submit"
          >
            Next
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
        By signing up, you agree to the{" "}
        <Link target="_blank" href={"/tos"} className={"underline"}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link target="_blank" href={"/privacy"} className={"underline"}>
          Privacy Policy
        </Link>
        , including Cookie Use.
      </p>
    </div>
  );
}
