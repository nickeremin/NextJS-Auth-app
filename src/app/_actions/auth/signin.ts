"use server"

import { isRedirectError } from "next/dist/client/components/redirect"
import { signIn } from "@/auth"
import { type SignInInputs } from "@/lib/validations/auth"
import { AuthError } from "next-auth"

import { CustomAuthError } from "./error"

export async function signInUser({ username, password }: SignInInputs) {
  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError && error.type == "CredentialsSignin") {
      return {
        message: "Invalid credentials!",
        code: "INVALID_CREDENTIALS",
      } satisfies CustomAuthError
    } else if (isRedirectError(error)) {
      console.log(error)
    } else {
      return {
        message: "Something went wrong!",
        code: "SOMETHING_WENT_WRONG",
      } satisfies CustomAuthError
    }
  }
}
