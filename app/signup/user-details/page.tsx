"use client";

import React from "react";
import { useSignUpFormState } from "../form-state";

export default function UserDetailsPage() {
  const [signUpFormState] = useSignUpFormState();
  console.log(signUpFormState);

  return <div>User Details</div>;
}
