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
import { useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

function UserTypeCard({ type }: { type: string }) {
  return (
    <div
      className={cn(
        "w-[250px] p-6 rounded-2xl flex flex-col gap-10 items-center shadow-xl",
        {
          "bg-primary-green-100": type === "Teacher",
          "bg-primary-orange-100": type === "Student",
          "bg-secondary-yellow-100": type === "Both",
        },
      )}
    >
      <h1 className="font-extrabold">{type}</h1>
      <ul className="font-bold">
        <li>Characteristic 1</li>
        <li>Characteristic 2</li>
        <li>Characteristic 3</li>
        <li>Characteristic 4</li>
        <li>Characteristic 5</li>
      </ul>
      <Button
        className="bg-primary-blue-100 text-primary-blue-500 border-2 border-primary-blue-500 hover:bg-primary-blue-500 hover:text-white"
        type="button"
      >
        Select
      </Button>
    </div>
  );
}

export default function SignUpPage() {
  const ref = useRef<HTMLFormElement>(null);
  // const [isSettingUpUser, setIsSettingUpUser] = useState(false);

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

  // if (isSettingUpUser) {
  //   return (
  //     <div className="m-28 flex flex-col gap-16">
  //       <div>
  //         <h1 className="font-inter text-secondary-black-500 font-extrabold">
  //           What type of user are you?
  //         </h1>
  //         <h2 className="font-roboto text-h2 py-4">
  //           Select the option that best fits your characteristics
  //         </h2>
  //       </div>
  //       <div className="flex justify-evenly">
  //         <UserTypeCard type="Teacher" />
  //         <UserTypeCard type="Student" />
  //         <UserTypeCard type="Both" />
  //       </div>
  //       <div>
  //         <div>
  //           <h1 className="font-inter text-secondary-black-500 font-extrabold">
  //             Frequently Asked Questions
  //           </h1>
  //           <h2 className="font-roboto text-h2 py-4">
  //             Get the answers to your questions straight away
  //           </h2>
  //         </div>
  //         <div>
  //           <Accordion type="multiple">
  //             <AccordionItem value="item-1">
  //               <AccordionTrigger className="font-bold">
  //                 Item 1 trigger
  //               </AccordionTrigger>
  //               <AccordionContent>Item 1 contenT</AccordionContent>
  //             </AccordionItem>
  //             <AccordionItem value="item-2">
  //               <AccordionTrigger className="font-bold">
  //                 Item 2 trigger
  //               </AccordionTrigger>
  //               <AccordionContent>Item 2 contenT</AccordionContent>
  //             </AccordionItem>
  //             <AccordionItem value="item-3">
  //               <AccordionTrigger className="font-bold">
  //                 Item 3 trigger
  //               </AccordionTrigger>
  //               <AccordionContent>Item 3 contenT</AccordionContent>
  //             </AccordionItem>
  //             <AccordionItem value="item-4">
  //               <AccordionTrigger className="font-bold">
  //                 Item 4 trigger
  //               </AccordionTrigger>
  //               <AccordionContent>Item 4 contenT</AccordionContent>
  //             </AccordionItem>
  //           </Accordion>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
                  <Input type="text" placeholder="Your email" {...field} />
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
            className="w-full min-h-[62px] border-2 border-primary-blue-500 bg-primary-blue-500 text-secondary-white-500 font-roboto text-xl p-4 rounded-lg hover:bg-primary-blue-500 hover:text-secondary-white-500"
            variant="outline"
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
