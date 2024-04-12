"use server"

import { signOut } from "@/auth"

import { type CustomAuthError } from "./error"

export async function signOutUser() {
  try {
    await signOut({
      redirect: false,
    })
  } catch (error) {
    return {
      message: "Something went wrong!",
      code: "SOMETHING_WENT_WRONG",
    } satisfies CustomAuthError
  }
}
