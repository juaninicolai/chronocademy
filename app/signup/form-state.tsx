"use client";

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

const initialState = {
  signUp: {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  },
  userDetails: {
    countryOfBirth: "",
    birthdate: new Date(),
    timezone: "",
    languages: [
      {
        language: "",
        languageLevel: "",
      },
    ],
  },
};

const SignUpFormStateContext = createContext<
  | [
      typeof initialState,
      React.Dispatch<React.SetStateAction<typeof initialState>>,
    ]
  | null
>(null);

export function SignUpFormStateProvider({ children }: PropsWithChildren) {
  const formState = useState(initialState);

  return (
    <SignUpFormStateContext.Provider value={formState}>
      {children}
    </SignUpFormStateContext.Provider>
  );
}

export function useSignUpFormState() {
  const formState = useContext(SignUpFormStateContext);

  if (formState === null) {
    throw new Error("useFormState must be used within FormStateProvider");
  }

  return formState;
}
