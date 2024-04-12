import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import ResetPasswordForm from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
}

function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <ResetPasswordForm />
      <Link
        href="/signup"
        className="select-none text-white hover:underline hover:underline-offset-2"
      >
        Not a Member? Sign up
      </Link>
    </div>
  )
}

export default ResetPasswordPage
