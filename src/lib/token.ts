import { db } from "@/db"
import { resetPasswordTokens } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getResetPasswordTokenByToken(token: string) {
  const resetPasswordToken = await db.query.resetPasswordTokens.findFirst({
    where: eq(resetPasswordTokens.token, token),
  })

  return resetPasswordToken
}

export async function getResetPasswordTokenByEmail(email: string) {
  const resetPasswordToken = await db.query.resetPasswordTokens.findFirst({
    where: eq(resetPasswordTokens.email, email),
  })

  return resetPasswordToken
}
