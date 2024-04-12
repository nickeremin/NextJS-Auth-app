"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { saltAndHashPassword } from "@/lib/auth"
import { SignUpInputs } from "@/lib/validations/auth"
import { eq } from "drizzle-orm"

import { CustomAuthError } from "./error"
import { signInUser } from "./signin"

export async function signUpUser({ username, email, password }: SignUpInputs) {
  const userWithSameEmail = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (userWithSameEmail) {
    return {
      message: "This email already exists.",
      code: "EMAIL_ALREADY_EXISTS",
    } satisfies CustomAuthError
  }

  const userWithSameUsername = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (userWithSameUsername) {
    return {
      message: "This username is already taken.",
      code: "USERNAME_ALREADY_EXISTS",
    } satisfies CustomAuthError
  }

  const pwHash = saltAndHashPassword(password)

  await db.insert(users).values({
    username,
    email,
    password: pwHash,
  })

  await signInUser({ username, password })
}
