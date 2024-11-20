"use client";

import React from "react";
import { useSignUpFormState } from "../form-state";

export default function SkillsPage() {
  const [signUpFormState] = useSignUpFormState();
  console.log(signUpFormState);
  // Form
  // Selector wtih skills from database
  // Textarea profile description
  return <div>Skills</div>;
}
