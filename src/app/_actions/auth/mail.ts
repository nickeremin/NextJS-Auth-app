import { env } from "@/env.mjs"
import { Resend } from "resend"

const resend = new Resend(env.RESEND_API_KEY)

export async function sendResetPasswordToken(email: string, token: string) {
  const confirmLink = `http://localhost:3000/signin/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p><a href="${confirmLink}">Reset your password.</a></p>`,
  })
}
