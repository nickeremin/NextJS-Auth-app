"use server"

import { db } from "@/db"
import { resetPasswordTokens, users } from "@/db/schema"
import { saltAndHashPassword } from "@/lib/auth"
import { getResetPasswordTokenByToken } from "@/lib/token"
import { getUserByEmail } from "@/lib/user"
import { NewPasswordInputs } from "@/lib/validations/auth"
import { eq } from "drizzle-orm"

import { CustomAuthError } from "./error"
import { sendResetPasswordToken } from "./mail"
import { generateResetPasswordToken } from "./token"

export async function generateAndSendResetToken(email: string) {
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {
      message: "This email doesn't exist.",
      code: "USER_DOES_NOT_EXISTED",
    } satisfies CustomAuthError
  }

  const token = await generateResetPasswordToken(email)
  await sendResetPasswordToken(email, token.token)
}

export async function resetPassword(
  { password }: NewPasswordInputs,
  token: string | null
) {
  if (!token) {
    return {
      message: "Token is missing!",
      code: "INVALID_TOKEN",
    } satisfies CustomAuthError
  }

  const existingResetPasswordToken = await getResetPasswordTokenByToken(token)

  if (!existingResetPasswordToken) {
    return {
      message: "Invalid token!",
      code: "INVALID_TOKEN",
    } satisfies CustomAuthError
  }

  const isExpired =
    existingResetPasswordToken.expires.getTime() < new Date().getTime()

  if (isExpired) {
    return {
      message: "Token has expired!",
      code: "INVALID_TOKEN",
    } satisfies CustomAuthError
  }

  const pwHash = saltAndHashPassword(password)

  await db
    .update(users)
    .set({
      password: pwHash,
    })
    .where(eq(users.email, existingResetPasswordToken.email))

  await db
    .delete(resetPasswordTokens)
    .where(eq(resetPasswordTokens.id, existingResetPasswordToken.id))
}
