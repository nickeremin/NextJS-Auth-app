"use server"

import { db } from "@/db"
import { resetPasswordTokens } from "@/db/schema"
import { getResetPasswordTokenByEmail } from "@/lib/token"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"

export async function generateResetPasswordToken(email: string) {
  const token = nanoid()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getResetPasswordTokenByEmail(email)

  if (existingToken) {
    await db
      .delete(resetPasswordTokens)
      .where(eq(resetPasswordTokens.id, existingToken.id))
  }

  const resetPasswordToken = await db
    .insert(resetPasswordTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning()

  return resetPasswordToken[0]!
}
